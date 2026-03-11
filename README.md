# 🛒 MyShop | High-Performance E-Commerce Experience

A modern, responsive e-commerce platform built with a focus on clean architecture, secure authentication, and a "real-feel" shopping journey.

## 🌟 Overview
MyShop is a multi-page React application that simulates a real-world retail environment. From browsing dynamic products fetched via API to managing a persistent shopping cart, the app leverages modern tools like **Clerk** for security and **Tailwind CSS** for a premium, high-contrast UI.

---

## 🚀 Key Features

* **Secure Auth:** Complete user lifecycle management (Sign In, Sign Up, and Profile) powered by Clerk.
* **Dynamic Product Feed:** Real-time data fetching from the [DummyJSON API](https://dummyjson.com/) using `async/await` and robust error handling.
* **Sophisticated Routing:** Seamless transitions between Listing, Details, and Cart pages via React Router DOM.
* **Cart Persistence:** A custom-built cart engine synced with `localStorage`, ensuring user data survives page refreshes.
* **Premium UI:** Featuring a sticky, backdrop-blur navigation bar and a "Dark Academia" aesthetic.

---

## 🛠️ Tech Stack

| Category        | Technology                        |
|-----------------|-----------------------------------|
| **Core** | React 18 (Vite)                  |
| **Auth** | Clerk Auth                       |
| **Styling** | Tailwind CSS                     |
| **State** | Context API (Global Cart/Product)|
| **Routing** | React Router DOM                 |
| **API** | Fetch API / DummyJSON            |

---

## 📂 System Architecture

The application is structured into a logical 3-tier page system:

1.  **Product Listing:** An interactive grid with dynamic data loading and responsive layouts.
2.  **Product Detail:** Deep-linking functionality using unique IDs to display specific product specifications and high-res imagery.
3.  **Shopping Cart:** A real-time management hub for quantity adjustments, dynamic price calculations, and item removal.

---

## 📂 Project Structure

```text
src/
 ├── components/  # Reusable UI (Navbar, ProductCards)
 ├── context/     # Global state management (Cart)
 ├── pages/       # Main views (Home, Product, Cart)

--- 
