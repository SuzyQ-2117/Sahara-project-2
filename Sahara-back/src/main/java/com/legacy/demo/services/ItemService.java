package com.legacy.demo.services;

import com.legacy.demo.repos.ItemRepo;
import com.legacy.demo.entities.Item;
import com.legacy.demo.dtos.ItemDto;

import jakarta.persistence.EntityNotFoundException;

import org.apache.logging.log4j.util.PropertySource.Comparator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Comparator;

@Service

public class ItemService {

    private final ItemRepo repo;

    public ItemService(ItemRepo repo) {
        this.repo = repo;
    }

    //CREATE
    public ResponseEntity<ItemDto> addItem(Item newItem) {
        Item created = this.repo.save(newItem);

        return new ResponseEntity<>(new ItemDto(created), HttpStatus.CREATED);
    }



    //READ
    public List<Item> getAllItems(List<String> sortParams) {
        List<Item> items = this.repo.findAll();
    
        if (sortParams != null && !sortParams.isEmpty()) {
            Comparator<Item> comparator = createComparator(sortParams); 
            items.sort(comparator);
        }
    
        return items;
    }

    public class ItemService {

    // Method to get all items with optional sorting
    public List<Item> getAllItems(List<String> sortParams) {
        // Get all items from repository
        List<Item> items = itemRepository.findAll();

        // If sort parameters are provided, apply sorting logic
        if (sortParams != null && !sortParams.isEmpty()) {
            Comparator<Item> comparator = createComparator(sortParams);  // Create dynamic comparator
            items.sort(comparator);  // Sort the items based on the comparator
        }

        return items;
    }

    // Create comparator dynamically based on the provided sorting fields and direction
    private Comparator<Item> createComparator(List<String> sortParams) {
        Comparator<Item> comparator = null;

        for (String param : sortParams) {
            String[] sortCriteria = param.split(",");
            String field = sortCriteria[0];  // Field to sort by (e.g., "name" or "price")
            String direction = sortCriteria.length > 1 ? sortCriteria[1] : "asc";  // Sort direction

            Comparator<Item> fieldComparator = getFieldComparator(field, direction);

            if (comparator == null) {
                comparator = fieldComparator;  // Initialize comparator
            } else {
                comparator = comparator.thenComparing(fieldComparator);  // Chain comparators
            }
        }

        return comparator;
    }

    private Comparator<Item> getFieldComparator(String field, String direction) {
        Comparator<Item> comparator;

        // Handle sorting based on field
        switch (field) {
            case "name":
                comparator = Comparator.comparing(Item::getName);
                break;
            case "price":
                comparator = Comparator.comparing(Item::getPrice);
                break;
            default:
                throw new IllegalArgumentException("Invalid sort field: " + field);
        }

        return "desc".equalsIgnoreCase(direction) ? comparator.reversed() : comparator;
    }
}


    // public List<ItemDto> getAll() {
    //     List<ItemDto> dtos = new ArrayList<>();
    //     List<Item> found = this.repo.findAll();
    //     for (Item Item : found) {
    //         dtos.add(new ItemDto(Item));
    //     }
    //     return dtos;
    // }

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



    //UPDATE
    public ResponseEntity<?> ItemUpdate(Integer id,
                                        String name,
                                        Double price,
                                        Integer quantity,
                                        String imageUrl,
                                        String color,
                                        String category,
                                        Boolean stockAvailable){

        Optional<Item> found = this.repo.findById(Math.toIntExact(id));
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with ID " + id, HttpStatus.NOT_FOUND);
        }

        Item toUpdate = found.get();

        if (name != null) toUpdate.setName(name);
        if (price != null) toUpdate.setPrice(price);
        if (quantity != null) toUpdate.setQuantity(quantity);
        if (imageUrl != null) toUpdate.setImageUrl(imageUrl);
        if (color != null) toUpdate.setColor(color);
        if (category != null) toUpdate.setCategory(category);
        if (stockAvailable != null) toUpdate.setStockAvailable(stockAvailable);

        Item updated = this.repo.save(toUpdate);
        return ResponseEntity.ok(new ItemDto(updated));
    }

    //UPDATE - add tag(s) to item
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


    //UPDATE - remove tag(s) from item
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



    //DELETE
    public ResponseEntity<?> removeItem(Integer id) {
        Optional<Item> found = this.repo.findById(id);
        if (found.isEmpty()) {
            return new ResponseEntity<>("No Item found with id " + id, HttpStatus.NOT_FOUND);
        }
        this.repo.deleteById(id);
        return ResponseEntity.ok("Item with id " + id + " has been deleted.");

    }
}