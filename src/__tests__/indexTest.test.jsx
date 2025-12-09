import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Product Dashboard Tests', () => {
  describe('Update Existing Element - Header', () => {
    test('renders an element with id "header"', () => {
      render(<App />)
      const header = document.getElementById('header')
      expect(header).toBeInTheDocument()
    })

    test('header displays "Product Dashboard"', () => {
      render(<App />)
      const header = document.getElementById('header')
      expect(header).toHaveTextContent('Product Dashboard')
    })
  })

  describe('Create New Elements for Each Product', () => {
    test('renders a product list container with id "product-list"', () => {
      render(<App />)
      const productList = document.getElementById('product-list')
      expect(productList).toBeInTheDocument()
    })

    test('displays all products with their names', () => {
      render(<App />)
      expect(screen.getByText('Laptop')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Tablet')).toBeInTheDocument()
    })

    test('displays product prices', () => {
      render(<App />)
      expect(screen.getByText(/\$999/)).toBeInTheDocument()
      expect(screen.getByText(/\$699/)).toBeInTheDocument()
      expect(screen.getByText(/\$499/)).toBeInTheDocument()
    })

    test('displays product availability status', () => {
      render(<App />)
      const inStockElements = screen.getAllByText('In Stock')
      const outOfStockElements = screen.getAllByText('Out of Stock')

      expect(inStockElements.length).toBe(2) // Laptop and Tablet
      expect(outOfStockElements.length).toBe(1) // Phone
    })

    test('each product is contained in a div element', () => {
      render(<App />)
      const productList = document.getElementById('product-list')
      const productDivs = productList.querySelectorAll('div')

      // Should have at least 3 product divs (one for each product)
      expect(productDivs.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Conditional Rendering - Out of Stock Styling', () => {
    test('applies "outOfStockClass" CSS Module class to out-of-stock products', () => {
      render(<App />)
      const phoneProduct = screen.getByText('Phone').closest('div')

      // Check that the out-of-stock product has the outOfStockClass
      expect(phoneProduct).toHaveClass('outOfStockClass')
    })

    test('does not apply "outOfStockClass" to in-stock products', () => {
      render(<App />)
      const laptopProduct = screen.getByText('Laptop').closest('div')
      const tabletProduct = screen.getByText('Tablet').closest('div')

      // In-stock products should not have outOfStockClass by itself
      // They may have productCard class, but checking they're styled differently
      expect(laptopProduct).not.toHaveClass('outOfStockClass')
      expect(tabletProduct).not.toHaveClass('outOfStockClass')
    })
  })

  describe('Bonus Challenge - Delete Element', () => {
    test('renders Remove buttons for each product', () => {
      render(<App />)
      const removeButtons = screen.getAllByText('Remove')

      // Should have 3 remove buttons (one for each product)
      expect(removeButtons.length).toBe(3)
    })

    test('removes product from the dashboard when Remove button is clicked', () => {
      render(<App />)

      // Verify Laptop exists
      expect(screen.getByText('Laptop')).toBeInTheDocument()

      // Get all remove buttons and click the first one
      const removeButtons = screen.getAllByText('Remove')
      fireEvent.click(removeButtons[0])

      // Laptop should be removed from the DOM
      expect(screen.queryByText('Laptop')).not.toBeInTheDocument()

      // Other products should still exist
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Tablet')).toBeInTheDocument()
    })

    test('can remove multiple products sequentially', () => {
      render(<App />)

      // Remove first product
      let removeButtons = screen.getAllByText('Remove')
      fireEvent.click(removeButtons[0])

      // Remove another product
      removeButtons = screen.getAllByText('Remove')
      fireEvent.click(removeButtons[0])

      // Should only have 1 remove button left
      removeButtons = screen.getAllByText('Remove')
      expect(removeButtons.length).toBe(1)
    })
  })
})
