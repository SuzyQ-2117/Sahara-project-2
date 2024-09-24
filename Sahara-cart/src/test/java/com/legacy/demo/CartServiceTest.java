package com.legacy.demo.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.legacy.demo.classes.CartItemData;
import com.legacy.demo.entities.Cart;
import com.legacy.demo.repos.CartRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

class CartServiceTest {

	@Mock
	private CartRepository cartRepository;

	@InjectMocks
	private CartService cartService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testCreateCartWithItems() {
		List<CartItemData> items = new ArrayList<>();
		CartItemData item1 = new CartItemData();
		item1.setId("item1");
		item1.setQuantity(2);
		items.add(item1);

		CartItemData item2 = new CartItemData();
		item2.setId("item2");
		item2.setQuantity(1);
		items.add(item2);

		String cartId = cartService.createCartWithItems(items);

		assertNotNull(cartId);
		verify(cartRepository, times(1)).save(any(Cart.class));
	}

	@Test
	void testGetCart_CartExists() {
		List<CartItemData> items = new ArrayList<>();
		CartItemData item1 = new CartItemData();
		item1.setId("item1");
		item1.setQuantity(2);
		items.add(item1);

		Cart cart = new Cart();
		cart.setCartId("123456");
		cart.setItems(items);

		when(cartRepository.findById("123456")).thenReturn(Optional.of(cart));

		List<CartItemData> retrievedItems = cartService.getCart("123456");

		assertEquals(1, retrievedItems.size());
		assertEquals("item1", retrievedItems.get(0).getId());
		assertEquals(2, retrievedItems.get(0).getQuantity());
		verify(cartRepository, times(1)).findById("123456");
	}

	@Test
	void testGetCart_CartNotFound() {
		when(cartRepository.findById("non-existent-id")).thenReturn(Optional.empty());

		Exception exception = assertThrows(RuntimeException.class, () -> {
			cartService.getCart("non-existent-id");
		});

		assertEquals("Cart not found", exception.getMessage());
		verify(cartRepository, times(1)).findById("non-existent-id");
	}

	@Test
	void testUpdateCart_CartExists() {
		List<CartItemData> items = new ArrayList<>();
		CartItemData item1 = new CartItemData();
		item1.setId("item1");
		item1.setQuantity(2);
		items.add(item1);

		Cart cart = new Cart();
		cart.setCartId("123456");
		cart.setItems(new ArrayList<>());
		cart.setStatus("in progress");

		when(cartRepository.findByCartId("123456")).thenReturn(Optional.of(cart));
		when(cartRepository.save(any(Cart.class))).thenReturn(cart);

		ResponseEntity<?> response = cartService.updateCart("123456", items, "completed");

		assertEquals(200, response.getStatusCodeValue());
		assertEquals("completed", ((Cart) response.getBody()).getStatus());
		verify(cartRepository, times(1)).save(cart);
	}

	@Test
	void testUpdateCart_CartNotFound() {
		when(cartRepository.findByCartId("non-existent-id")).thenReturn(Optional.empty());

		ResponseEntity<?> response = cartService.updateCart("non-existent-id", null, null);

		assertEquals(404, response.getStatusCodeValue());
		assertEquals("No Cart found with ID non-existent-id", response.getBody());
		verify(cartRepository, times(0)).save(any(Cart.class));
	}

	@Test
	void testCreateCartWithNoItems() {
		List<CartItemData> items = new ArrayList<>();

		String cartId = cartService.createCartWithItems(items);

		assertNotNull(cartId);
		verify(cartRepository, times(1)).save(any(Cart.class));
	}

	@Test
	void testUpdateCartWithNoItems() {
		Cart cart = new Cart();
		cart.setCartId("123456");
		cart.setItems(new ArrayList<>());
		cart.setStatus("in progress");

		when(cartRepository.findByCartId("123456")).thenReturn(Optional.of(cart));
		when(cartRepository.save(any(Cart.class))).thenReturn(cart);

		ResponseEntity<?> response = cartService.updateCart("123456", new ArrayList<>(), "completed");

		assertEquals(200, response.getStatusCodeValue());
		assertEquals("completed", ((Cart) response.getBody()).getStatus());
		assertTrue(cart.getItems().isEmpty());
		verify(cartRepository, times(1)).save(cart);
	}

	@Test
	void testUpdateCartStatusOnly() {
		List<CartItemData> items = new ArrayList<>();
		Cart cart = new Cart();
		cart.setCartId("123456");
		cart.setItems(items);
		cart.setStatus("in progress");

		when(cartRepository.findByCartId("123456")).thenReturn(Optional.of(cart));
		when(cartRepository.save(any(Cart.class))).thenReturn(cart);

		ResponseEntity<?> response = cartService.updateCart("123456", null, "completed");

		assertEquals(200, response.getStatusCodeValue());
		assertEquals("completed", ((Cart) response.getBody()).getStatus());
		verify(cartRepository, times(1)).save(cart);
	}

	@Test
	void testGetCart_InvalidCartId() {
		String invalidCartId = "invalid-id";

		when(cartRepository.findById(invalidCartId)).thenReturn(Optional.empty());

		Exception exception = assertThrows(RuntimeException.class, () -> {
			cartService.getCart(invalidCartId);
		});

		assertEquals("Cart not found", exception.getMessage());
		verify(cartRepository, times(1)).findById(invalidCartId);
	}


}
