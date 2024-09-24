package com.legacy.demo.classes;

import jakarta.persistence.Embeddable;

/**
 * Represents the data associated with an item in a shopping cart.
 * This class is used to encapsulate the details of an item such as its identifier, name, price, and quantity.
 *
 * It is marked as {@code @Embeddable} to allow its usage as a component within other entity classes
 * in a JPA (Jakarta Persistence API) context..
 */
@Embeddable
public class CartItemData {

    /**
     * The unique identifier for the cart item.
     * This value should be unique for each item in the cart.
     */
    private String id;

    /**
     * The name of the cart item.
     * This provides a human-readable description of the item.
     */
    private String name;

    /**
     * The price of a single unit of the cart item.
     * This value represents the cost of the item in the cart.
     */
    private double price;

    /**
     * The quantity of the cart item in the cart.
     * This represents the number of units of the item that the user has added to the cart.
     */
    private int quantity;

    /**
     * Gets the unique identifier of the cart item.
     *
     * @return the unique identifier of the cart item
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the unique identifier of the cart item.
     *
     * @param id the unique identifier to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the name of the cart item.
     *
     * @return the name of the cart item
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the cart item.
     *
     * @param name the name of the cart item to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the price of the cart item.
     *
     * @return the price of the cart item
     */
    public double getPrice() {
        return price;
    }

    /**
     * Sets the price of the cart item.
     *
     * @param price the price of the cart item to set
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Gets the quantity of the cart item.
     *
     * @return the quantity of the cart item
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Sets the quantity of the cart item.
     *
     * @param quantity the quantity of the cart item to set
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
