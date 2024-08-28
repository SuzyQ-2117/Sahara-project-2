package com.legacy.demo.controllers;

import com.legacy.demo.entities.Item;
import com.legacy.demo.services.ItemService;
import com.legacy.demo.dtos.ItemDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ItemController {

    private ItemService service;

    public ItemController(ItemService service) { this.service = service;}

    //CREATE
    @PostMapping("/item/add")
    public ResponseEntity<?> addItem(@RequestBody Item item){
        return this.service.addItem(item);
    }

    //READ
    @GetMapping("/items/getAll")
    public List<ItemDto> getAll() {return this.service.getAll();}

    @GetMapping("/items/get/{id}")
    public ResponseEntity<?> getItem(@PathVariable Integer id) {return this.service.getItem(id);}

    @PostMapping("/items/getByIds")
    public List<ItemDto> getItemsByIds(@RequestBody List<Integer> ids) {
        return this.service.getItemsByIds(ids);
    }

    //UPDATE
    @PatchMapping("item/update/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Integer id,
                                        @RequestBody Item ItemUpdate){
        return this.service.ItemUpdate(id, ItemUpdate.getName(), ItemUpdate.getPrice(), ItemUpdate.getQuantity(), ItemUpdate.getImageUrl(), ItemUpdate.getColor(), ItemUpdate.getCategory(), ItemUpdate.getStockAvailable());
    }

    //UPDATE - add tag
    @PatchMapping("/item/update/{id}/addTag")
    public ResponseEntity<ItemDto> addTag(@PathVariable Integer id,
                                    @RequestBody List<String> tagsToAdd){
        Item updatedItem = this.service.addTags(id, tagsToAdd);
        return ResponseEntity.ok(new ItemDto(updatedItem));
    }

    //UPDATE - remove tag
    @PatchMapping("item/update/{id}/removeTag")
    public ResponseEntity<ItemDto> removeTag(@PathVariable Integer id,
                                       @RequestBody List<String> tagsToRemove){
        Item updatedItem = this.service.removeTags(id, tagsToRemove);
        return ResponseEntity.ok(new ItemDto(updatedItem));
    }

    //DELETE
    @DeleteMapping("/item/remove/{id}")
    public ResponseEntity<?> removeItem(@PathVariable Integer id){
        return this.service.removeItem(id);
    }

}
