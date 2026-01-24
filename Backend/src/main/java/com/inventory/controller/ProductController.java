//package com.inventory.controller;
//
//import com.inventory.dto.ProductDTO;
//import com.inventory.service.ProductService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/products")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*", maxAge = 3600)
//public class ProductController {
//
//    private final ProductService productService;
//
//    @GetMapping
//    public ResponseEntity<List<ProductDTO>> getAllProducts() {
//        return ResponseEntity.ok(productService.getAllProducts());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
//        try {
//            return ResponseEntity.ok(productService.getProductById(id));
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
//        ProductDTO created = productService.createProduct(productDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body(created);
//    }
//
//    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id,
//                                                    @Valid @RequestBody ProductDTO productDTO) {
//        try {
//            return ResponseEntity.ok(productService.updateProduct(id, productDTO));
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
//        try {
//            productService.deleteProduct(id);
//            return ResponseEntity.ok().build();
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @GetMapping("/search")
//    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String name) {
//        return ResponseEntity.ok(productService.searchProducts(name));
//    }
//}

//package com.inventory.controller;
//
//import com.inventory.dto.ProductDTO;
//import com.inventory.entity.Product;
//import com.inventory.service.ProductService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/products")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*", maxAge = 3600)
//public class ProductController {
//
//    private final ProductService productService;
//
//
//    @GetMapping
//    public ResponseEntity<List<Product>> getAllProducts() {
//        return ResponseEntity.ok(productService.getAllProducts());
//    }
//
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
//        try {
//            return ResponseEntity.ok(productService.getProductById(id));
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//
//    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Product> createProduct(
//            @Valid @RequestBody ProductDTO productDTO) {
//
//        Product created = productService.createProduct(productDTO);
//        return ResponseEntity.status(HttpStatus.CREATED).body(created);
//    }
//
//
//    @PutMapping("/{id}/stock-in")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Product> stockIn(
//            @PathVariable Long id,
//            @RequestParam int qty) {
//
//        return ResponseEntity.ok(productService.stockIn(id, qty));
//    }
//
//
//    @PutMapping("/{id}/stock-out")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Product> stockOut(
//            @PathVariable Long id,
//            @RequestParam int qty) {
//
//        return ResponseEntity.ok(productService.stockOut(id, qty));
//    }
//
//
//    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
//    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
//        try {
//            productService.deleteProduct(id);
//            return ResponseEntity.ok().build();
//        } catch (RuntimeException e) {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}
package com.inventory.controller;

import com.inventory.dto.ProductRequest;
import com.inventory.entity.Product;
import com.inventory.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAll();
    }

    @PostMapping
    public Product addProduct(@RequestBody ProductRequest req) {
        return productService.create(req);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody ProductRequest req) {
        return productService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    @GetMapping("/search")
    public List<Product> search(@RequestParam String name) {
        return productService.search(name);
    }
}

