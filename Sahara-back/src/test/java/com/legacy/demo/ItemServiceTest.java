package com.legacy.demo.services;

import com.legacy.demo.dtos.ItemDto;
import com.legacy.demo.entities.Item;
import com.legacy.demo.repos.ItemRepo;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ItemServiceTest {

    @InjectMocks
    private ItemService itemService;

    @Mock
    private ItemRepo itemRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddItem() {
        Item item = new Item();
        item.setName("Test Item");
        item.setPrice(10.0);
        item.setQuantity(5);

        when(itemRepo.save(any(Item.class))).thenReturn(item);

        ResponseEntity<ItemDto> response = itemService.addItem(item);

        assertEquals(201, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("Test Item", response.getBody().getName());
    }

    @Test
    public void testGetAllFiltered_WithMinPrice() {
        Item item1 = new Item();
        item1.setPrice(5.0);
        Item item2 = new Item();
        item2.setPrice(15.0);

        when(itemRepo.findAll()).thenReturn(Arrays.asList(item1, item2));

        List<Item> result = itemService.getAllFiltered(null, 10.0, null, null, null, null);

        assertEquals(1, result.size());
        assertEquals(15.0, result.get(0).getPrice());
    }

    @Test
    public void testGetItem_ItemFound() {
        Item item = new Item();
        item.setId(1);
        item.setName("Test Item");

        when(itemRepo.findById(1)).thenReturn(Optional.of(item));

        ResponseEntity<?> response = itemService.getItem(1);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetItem_ItemNotFound() {
        when(itemRepo.findById(1)).thenReturn(Optional.empty());

        ResponseEntity<?> response = itemService.getItem(1);

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("No Item found with id 1", response.getBody());
    }

    @Test
    public void testItemUpdate_ItemFound() {
        Item item = new Item();
        item.setId(1);
        item.setName("Old Item");
        item.setPrice(10.0);
        item.setQuantity(5);

        when(itemRepo.findById(1)).thenReturn(Optional.of(item));
        when(itemRepo.save(any(Item.class))).thenReturn(item);

        ResponseEntity<?> response = itemService.ItemUpdate(1, "Updated Item", 15.0, 10, null, null, null);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("Updated Item", ((ItemDto) response.getBody()).getName());
        assertEquals(15.0, ((ItemDto) response.getBody()).getPrice());
    }

    @Test
    public void testItemUpdate_ItemNotFound() {
        when(itemRepo.findById(1)).thenReturn(Optional.empty());

        ResponseEntity<?> response = itemService.ItemUpdate(1, "Updated Item", 15.0, 10, null, null, null);

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("No Item found with ID 1", response.getBody());
    }

    @Test
    public void testRemoveItem_ItemFound() {
        Item item = new Item();
        item.setId(1);

        when(itemRepo.findById(1)).thenReturn(Optional.of(item));
        doNothing().when(itemRepo).deleteById(1);

        ResponseEntity<?> response = itemService.removeItem(1);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Item with id 1 has been deleted.", response.getBody());
    }

    @Test
    public void testRemoveItem_ItemNotFound() {
        when(itemRepo.findById(1)).thenReturn(Optional.empty());

        ResponseEntity<?> response = itemService.removeItem(1);

        assertEquals(404, response.getStatusCodeValue());
        assertEquals("No Item found with id 1", response.getBody());
    }

    @Test
    public void testGetItemsByIds() {
        Item item1 = new Item();
        item1.setId(1);
        item1.setName("Item 1");

        Item item2 = new Item();
        item2.setId(2);
        item2.setName("Item 2");

        when(itemRepo.findAllById(Arrays.asList(1, 2))).thenReturn(Arrays.asList(item1, item2));

        List<ItemDto> dtos = itemService.getItemsByIds(Arrays.asList(1, 2));

        assertEquals(2, dtos.size());
        assertEquals("Item 1", dtos.get(0).getName());
        assertEquals("Item 2", dtos.get(1).getName());
    }

    @Test
    public void testGetAllDistinctCategories() {
        when(itemRepo.findDistinctCategories()).thenReturn(Arrays.asList("Category1", "Category2"));

        List<String> categories = itemService.getAllDistinctCategories();

        assertEquals(2, categories.size());
        assertTrue(categories.contains("Category1"));
        assertTrue(categories.contains("Category2"));
    }


}
