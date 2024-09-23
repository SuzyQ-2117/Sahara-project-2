package com.legacy.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import com.legacy.demo.entities.Item;

import java.util.List;

@Repository
public interface ItemRepo extends JpaRepository <Item, Integer> {
    @Query("SELECT DISTINCT i.category FROM Item i")
    List<String> findDistinctCategories();
}
