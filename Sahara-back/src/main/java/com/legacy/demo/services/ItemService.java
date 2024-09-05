package com.legacy.demo.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.legacy.demo.dtos.ItemDto;
import com.legacy.demo.entities.Item;
import com.legacy.demo.repos.ItemRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ItemService {

    private final ItemRepo repo;

    public ItemService(ItemRepo repo) {
        this.repo = repo;
    }

    // CREATE
    public ResponseEntity<ItemDto> addItem(Item newItem) {
        Item created = this.repo.save(newItem);

        return new ResponseEntity<>(new ItemDto(created), HttpStatus.CREATED);
    }

    // READ
    public List<Item> getAllFiltered(List<String> sort, Double minPrice, Double maxPrice, String category, Boolean inStock, String searchTerm) {
        List<Item> items = this.repo.findAll();
    
        // Apply filtering logic
        if (minPrice != null) {
            items = items.stream()
                    .filter(item -> item.getPrice() >= minPrice)
                    .collect(Collectors.toList());
        }
    
        if (maxPrice != null) {
            items = items.stream()
                    .filter(item -> item.getPrice() <= maxPrice)
                    .collect(Collectors.toList());
        }
    
        if (category != null && !category.isEmpty()) {
            items = items.stream()
                    .filter(item -> item.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }
    
        if (inStock != null && inStock) {
            items = items.stream()
                    .filter(item -> item.getQuantity() > 0)
                    .collect(Collectors.toList());
        }

        if (searchTerm != null && !searchTerm.isEmpty()) {
            items = items.stream()
                    .filter(item -> item.getTags() != null && item.getTags().stream()
                            .anyMatch(tag -> tag.equalsIgnoreCase(searchTerm)))  // Search in tags
                    .collect(Collectors.toList());
        }
    
        // Sorting logic
        if (sort != null && !sort.isEmpty()) {
            Comparator<Item> comparator = null;
            for (String param : sort) {
                String[] sortCriteria = param.split(",");
                if (sortCriteria.length != 2) {
                    throw new IllegalArgumentException("Invalid sort parameter format: " + param);
                }
    
                String field = sortCriteria[0];
                String direction = sortCriteria[1];
    
                // Skip sorting if "none" is passed
                if ("none".equalsIgnoreCase(direction)) {
                    continue; // Skip this sorting field
                }
    
                // Get the comparator for the specific field and direction
                Comparator<Item> fieldComparator = getFieldComparator(field, direction);
    
                if (comparator == null) {
                    comparator = fieldComparator;
                } else {
                    comparator = comparator.thenComparing(fieldComparator);
                }
            }
    
            // Apply the comparator if it was built
            if (comparator != null) {
                items.sort(comparator);
            }
        }
    
        return items;
    }
    

    private Comparator<Item> getFieldComparator(String field, String direction) {
        Comparator<Item> comparator;

        switch (field.toLowerCase()) {
            case "name":
                comparator = Comparator.comparing(Item::getName);
                break;
            case "price":
                comparator = Comparator.comparing(Item::getPrice);
                break;
            case "quantity":
                comparator = Comparator.comparing(Item::getQuantity);
                break;
            default:
                throw new IllegalArgumentException("Invalid sort field: " + field);
        }

        // Reverse comparator if direction is descending
        return "desc".equalsIgnoreCase(direction) ? comparator.reversed() : comparator;
    }

    public ResponseEntity<?> getItem(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(new ItemDto(found.get()));
    }

    public List<ItemDto> getItemsByIds(List<Integer> ids) {
        List<Item> items = this.repo.findAllById(ids);
        List<ItemDto> dtos = new ArrayList<>();
        for (Item item : items) {
            dtos.add(new ItemDto(item));
        }
        return dtos;
    }

    // UPDATE
    public ResponseEntity<?> ItemUpdate(Integer id,
            String name,
            Double price,
            Integer quantity,
            String imageUrl,
            String color,
            String category) {

        Optional<Item> found = this.repo.findById(Math.toIntExact(id));
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with ID " + id, HttpStatus.NOT_FOUND);
        }

        Item toUpdate = found.get();

        if (name != null)
            toUpdate.setName(name);
        if (price != null)
            toUpdate.setPrice(price);
        if (quantity != null)
            toUpdate.setQuantity(quantity);
        if (imageUrl != null)
            toUpdate.setImageUrl(imageUrl);
        if (color != null)
            toUpdate.setColor(color);
        if (category != null)
            toUpdate.setCategory(category);

        Item updated = this.repo.save(toUpdate);
        return ResponseEntity.ok(new ItemDto(updated));
    }

    // UPDATE - add tag(s) to item
    public Item addTags(Integer id, List<String> tagsToAdd) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isPresent()) {
            Item item = found.get();
            ArrayList<String> currentTags = item.getTags();
            for (String tag : tagsToAdd) {
                if (!currentTags.contains(tag)) {
                    currentTags.add(tag);
                }
            }
            item.setTags(currentTags);
            this.repo.save(item);
            return item;
        } else {
            throw new EntityNotFoundException("Item not found with ID: " + id);
        }
    }

    // UPDATE - remove tag(s) from item
    public Item removeTags(Integer id, List<String> tagsToRemove) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isPresent()) {
            Item item = found.get();
            ArrayList<String> currentTags = item.getTags();
            currentTags.removeAll(tagsToRemove);
            item.setTags(currentTags);
            this.repo.save(item);
            return item;
        } else {
            throw new EntityNotFoundException("Item not found with ID: " + id);
        }
    }

    // DELETE
    public ResponseEntity<?> removeItem(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }
        this.repo.deleteById(id);
        return ResponseEntity.ok("Item with id " + id + " has been deleted.");

    }
}