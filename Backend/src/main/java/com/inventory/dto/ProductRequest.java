package com.inventory.dto;


import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequest {
    private String sku;
    private String name;
    private String description;
    private String category;
    private String supplier;
    private Integer quantity;
    private BigDecimal price;
    private Integer minStockLevel;
}
