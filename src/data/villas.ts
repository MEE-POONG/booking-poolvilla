export interface Villa {
    id: string;
    name: string;
    price: number;
    guests: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    imageUrl: string;
    description: string;
    features: string[];
    images: string[];
}

export const villas: Villa[] = [
    {
        id: "1",
        name: "Mountain Breeze Villa",
        price: 8500,
        guests: 8,
        bedrooms: 3,
        bathrooms: 3,
        size: 250,
        imageUrl: "/images/villa-1.png",
        description: "A stunning modern villa with panoramic mountain views, featuring a private infinity pool and spacious outdoor terrace for the ultimate relaxation. Perfect for families or groups of friends seeking a peaceful escape.",
        features: ["Private Infinity Pool", "Mountain View", "BBQ Grill", "Free Wi-Fi", "Smart TV", "Fully Equipped Kitchen", "Parking"],
        images: ["/images/villa-1.png", "/images/villa-2.png", "/images/villa-3.png"],
    },
    {
        id: "2",
        name: "Forest Hideaway",
        price: 12000,
        guests: 12,
        bedrooms: 5,
        bathrooms: 4,
        size: 400,
        imageUrl: "/images/villa-2.png",
        description: "Surrounded by lush tropical gardens, this expansive villa offers complete privacy, a large family pool, and luxurious amenities for large groups. Experience nature without compromising on comfort.",
        features: ["Large Private Pool", "Garden View", "Karaoke System", "Outdoor Dining Area", "Daily Housekeeping", "Welcome Drink"],
        images: ["/images/villa-2.png", "/images/villa-1.png", "/images/villa-3.png"],
    },
    {
        id: "3",
        name: "Romantic Pool Suite",
        price: 5500,
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        size: 120,
        imageUrl: "/images/villa-3.png",
        description: "The perfect getaway for couples. Intimate, cozy, and stylish with a private plunge pool and romantic sunset views over the valley. Create unforgettable memories in this hidden gem.",
        features: ["Private Plunge Pool", "Sunset View", "King Size Bed", "Bathtub", "Mini Bar", "Room Service"],
        images: ["/images/villa-3.png", "/images/villa-1.png", "/images/villa-2.png"],
    },
];
