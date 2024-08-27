package com.legacy.demo.dtos;


import com.legacy.demo.entities.Item;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;


public class ItemDto {
    private Integer id;
    private String name;
    private Double price;
    private Integer quantity;
    private String imageUrl;
    private String color;
    private String category;
    private ArrayList<String> tags;
    private Boolean stockAvailable;

    public ItemDto(Integer id, String name, Double price, Integer quantity, String imageUrl, String color, String category, ArrayList<String> tags, Boolean stockAvailable) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.color = color;
        this.category = category;
        this.tags = tags;
        this.stockAvailable = stockAvailable;
    }
    public ItemDto() {
        super();
    }

    public ItemDto(Item item){
        this.id = item.getId();
        this.name = item.getName();
        this.price = item.getPrice();
        this.quantity = item.getQuantity();
        this.imageUrl = item.getImageUrl();
        this.color = item.getColor();
        this.category = item.getCategory();
        this.tags = item.getTags();
        this.stockAvailable = item.getStockAvailable();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ArrayList<String> getTags() {
        return tags;
    }

    public void setTags(ArrayList<String> tags) {
        this.tags = tags;
    }

    public Boolean getStockAvailable() {
        return stockAvailable;
    }

    public void setStockAvailable(Boolean stockAvailable) {
        this.stockAvailable = stockAvailable;
    }
}
