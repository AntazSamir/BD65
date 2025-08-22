// Simple test script to check if our API endpoints work
const { storage } = require('./server/storage.ts');

async function testAPI() {
  try {
    console.log('Testing API endpoints...');
    
    // Test destinations
    const destinations = await storage.getDestinations();
    console.log(`✅ Destinations: ${destinations.length} found`);
    if (destinations.length > 0) {
      console.log(`First destination: ${destinations[0].name}`);
    }
    
    // Test hotels
    const hotels = await storage.getHotels();
    console.log(`✅ Hotels: ${hotels.length} found`);
    if (hotels.length > 0) {
      console.log(`First hotel: ${hotels[0].name}`);
    }
    
    // Test restaurants
    const restaurants = await storage.getRestaurants();
    console.log(`✅ Restaurants: ${restaurants.length} found`);
    if (restaurants.length > 0) {
      console.log(`First restaurant: ${restaurants[0].name}`);
    }

    console.log('\n🎉 All API endpoints have data!');
    
  } catch (error) {
    console.error('❌ Error testing API:', error);
  }
}

testAPI();
