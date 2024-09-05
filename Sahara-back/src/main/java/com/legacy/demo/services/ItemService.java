package com.legacy.demo.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

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
    // Method to get all items with optional dynamic multi-field sorting
    public List<Item> getAll(List<String> sort) {
        System.out.println("Received sort params: " + sort);

        List<Item> items = this.repo.findAll();

        if (sort != null && !sort.isEmpty()) {
            Comparator<Item> comparator = null;

            // Loop through each sorting parameter (field,direction)
            for (String param : sort) {
                String[] sortCriteria = param.split(",");
                if (sortCriteria.length != 2) {
                    throw new IllegalArgumentException("Invalid sort parameter format: " + param);
                }

                String field = sortCriteria[0];
                String direction = sortCriteria[1];

                // If 'none' is passed as the direction, skip sorting for this field
                if ("none".equalsIgnoreCase(direction)) {
                    continue; // Skip this field and move to the next one
                }

                // Get the comparator for the specific field and direction
                Comparator<Item> fieldComparator = getFieldComparator(field, direction);

                // Dynamically chain comparators for multi-field sorting
                if (comparator == null) {
                    // Initialize comparator if it's the first one
                    comparator = fieldComparator;
                } else {
                    // Chain comparators if more than one sort field
                    comparator = comparator.thenComparing(fieldComparator);
                }
            }

            // Apply sorting based on the dynamically built comparator
            if (comparator != null) {
                items.sort(comparator);
            }
        }

        return items;
    }

    // Comparator builder method for specific fields and sort directions
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
            String category,
            Boolean stockAvailable) {

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
        if (stockAvailable != null)
            toUpdate.setStockAvailable(stockAvailable);

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