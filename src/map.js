import React, {useState}  from "react";
import { GoogleMap, useJsApiLoader ,Marker, InfoWindow} from "@react-google-maps/api";
import "./map.css";

// Set the map's center position
const center = {
  lat:  -28.958938769344897,
  lng: 25.403825803995364,
};

// Choose what to display on the map
const styles = {
  default: [],
  hide: [
    {
      featureType: "poi",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
  ],
};

//Placeholder for the pin's information
const propertyListings = [
  {
    id: 1,
    position: { lat: -26.198857405708537, lng: 28.007386742232416 },
    list_date: '2023-01-01',
    title: 'Cozy Apartment in the City',
    location: 'Johannesburg, SA',
    type: 'Apartment',
    beds: 2,
    bathrooms: 1,
    price: 'R100/night',
    availablefrom:'2023-10-01',
    availableto:'2023-10-07',
    imageUrl: '/Images/property1.webp',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'Parking', 'Air Conditioning'],
    description:
      'This cozy apartment in the heart of the city offers a comfortable stay with modern amenities. It features two bedrooms, a fully equipped kitchen, and a beautiful view of the city skyline.',
    nearby: ['Visit Apartheid Museum', 'Explore Maboneng Precinct', 'Shop at Sandton City Mall'],
  },
  {
    id: 2,
    position: { lat: -28.716323761935303, lng: 24.742429469034306 },
    list_date: '2023-08-13',
    title: 'Rustic Cabin in the Woods',
    location: 'Kimberly, SA',
    type: 'Cabin',
    beds: 4,
    bathrooms: 3,
    price: 'R250/night',
    availablefrom:'2023-10-01',
    availableto:'2023-10-14',
    imageUrl: '/Images/property2.webp',
    amenities: ['Free Wi-Fi', 'Fireplace', 'Nature Trails', 'Private Lake'],
    description:
      'Escape to this rustic cabin nestled in the woods. Perfect for nature lovers, it offers a serene environment with hiking trails, a cozy fireplace, and a private lake for fishing.',
    nearby: ['Hike in the nearby forest', 'Fishing in the private lake', 'Stargazing at night'],
  },
  {
    id: 3,
    position: { lat: -33.9857337946768, lng: 18.556856052865633 },
    list_date: '2023-01-23',
    title: 'Beachfront Villa with Stunning Views',
    location: 'Cape Town, SA',
    type: 'Villa',
    beds: 8,
    bathrooms: 10,
    price: 'R80/night',
    availablefrom:'2023-10-01',
    availableto:'2023-10-14',
    imageUrl: '/Images/property3.webp',
    amenities: ['Free Wi-Fi', 'Ocean View', 'Private Beach Access', 'Swimming Pool'],
    description:
      'Indulge in luxury at this beachfront villa with breathtaking ocean views. This villa features eight bedrooms, a private beach, and a stunning infinity pool overlooking the ocean.',
    nearby: ['Relax on the private beach', 'Explore Cape Point', 'Visit Table Mountain'],
  },
  {
    id: 4,
    position: { lat: -29.84730752676241, lng: 31.017384738380567 },
    list_date: '2023-12-24',
    title: 'Luxury Penthouse with Beach Views',
    location: 'Durban, SA',
    type: 'Villa',
    beds: 4,
    bathrooms: 4,
    price: 'R350/night',
    availablefrom:'2023-10-14',
    availableto:'2023-10-18',
    imageUrl: '/Images/property4.webp',
    amenities: ['Free Wi-Fi', 'Beachfront', 'Private Terrace', 'Gym'],
    description:
      'Experience luxury living in this beachfront penthouse with stunning beach views. The penthouse offers four bedrooms, a private terrace, and access to a fully equipped gym.',
    nearby: ['Enjoy watersports on the beach', 'Dine at local seafood restaurants', 'Visit uShaka Marine World'],
  },
  {
    id: 5,
    position: { lat: -27.83261042097482, lng: 29.68088678570063 },
    list_date: '2023-06-06',
    title: 'Mountain Retreat with Hot Tub',
    location: 'Newcastle, SA',
    type: 'House',
    beds: 10,
    bathrooms: 15,
    price: 'R150/night',
    availablefrom:'2023-10-09',
    availableto:'2023-10-21',
    imageUrl: '/Images/property5.webp',
    amenities: ['Free Wi-Fi', 'Mountains', 'Private Terrace', 'Gym'],
    description:
      'Experience luxury living in this penthouse with stunning mountain views. The penthouse offers four bedrooms, a private terrace, and access to a fully equipped gym.',
    nearby: ['Enjoy watersports on the nearby lake', 'Dine at local Indian restaurants', 'Visit Newcastle Sports World'],
  },
  {
    id: 6,
    position: { lat: -24.95776189459314, lng: 31.11540506218935 },
    list_date: '2023-02-15',
    title: 'Safari Lodge ',
    location: 'Kruger National Park, SA',
    type: 'Cabin',
    beds: 6,
    bathrooms: 5,
    price: 'R300/night',
    availablefrom: '2023-10-01',
    availableto: '2023-10-07',
    imageUrl: '/Images/property6.webp',
    amenities: ['Game Drives', 'Swimming Pool', 'Outdoor Dining', 'Wildlife Viewing'],
    description:
      'Experience the beauty of the wild at this safari lodge in Kruger National Park. Enjoy game drives, wildlife viewing, and comfortable accommodations in the heart of the park.',
    nearby: ['Explore Kruger National Park', 'Spot the Big Five', 'Bird Watching'],
  },
  {
    id: 7,
    position: { lat: -33.92523783245308, lng: 25.61180041984406 },
    list_date: '2023-03-22',
    title: 'Seaside Cottage',
    location: 'Port Elizabeth, SA',
    type: 'Cabin',
    beds: 3,
    bathrooms: 2,
    price: 'R180/night',
    availablefrom: '2023-11-01',
    availableto: '2023-11-28',
    imageUrl: '/Images/property7.webp',
    amenities: ['Views', 'Private Beach Access', 'Patio', 'BBQ Grill'],
    description:
      'Relax by the sea at this charming seaside cottage in Port Elizabeth. Enjoy stunning ocean views, direct beach access, and a cozy patio for outdoor dining.',
    nearby: ['Swim in the ocean', 'Visit Addo Elephant National Park', 'Explore Boardwalk Casino'],
  },
  {
    id: 8,
    position: { lat: -28.143573366799973, lng:  26.42428875244449},
    list_date: '2023-04-10',
    title: 'Rural Farmhouse',
    location: 'Free State, SA',
    type: 'House',
    beds: 5,
    bathrooms: 3,
    price: 'R120/night',
    availablefrom: '2023-11-01',
    availableto: '2023-11-15',
    imageUrl: '/Images/property8.webp',
    amenities: ['Views', 'Farm Animals', 'Fireplace', 'Hiking Trails'],
    description:
      'Experience rural life at this charming farmhouse in Free State. Enjoy scenic views, interact with farm animals, and explore nearby hiking trails.',
    nearby: ['Hike in the countryside', 'Farm experience for kids', 'Visit Golden Gate Highlands National Park'],
  },
  {
    id: 9, 
    position: { lat: -28.758522293270833,  lng: 21.059924290820142 },
    list_date: '2023-05-18',
    title: 'Historic Guesthouse',
    location: 'Upington, SA',
    type: 'Apartment',
    beds: 6,
    bathrooms: 4,
    price: 'R220/night',
    availablefrom: '2023-11-01',
    availableto: '2023-11-21',
    imageUrl: '/Images/property9.webp',
    amenities: ['Antique Furnishings', 'Garden', 'Breakfast Included', 'Library'],
    description:
      'Step back in time at this historic guesthouse in Upington. Enjoy antique furnishings, a beautiful garden, and a library for quiet reading.',
    nearby: ['Visit Voortrekker Monument', 'Explore Union Buildings', 'Dine at local restaurants'],
  },
  {
    id: 10,
    position: { lat: -34.01569917560378, lng:  23.071243433264687},
    list_date: '2023-06-30',
    title: 'Wine Estate Villa',
    location: 'Knysna, SA',
    type: 'Villa',
    beds: 7,
    bathrooms: 6,
    price: 'R280/night',
    availablefrom: '2023-11-12',
    availableto: '2023-11-25',
    imageUrl: '/Images/property10.webp',
    amenities: ['Views', 'Wine Tasting', 'Swimming Pool', 'Outdoor Dining'],
    description:
      'Experience the charm of wine country at this villa in Knysna. Enjoy vineyard views, wine tasting, and a refreshing swimming pool for relaxation.',
    nearby: ['Wine tasting in local vineyards', 'Explore historic Knysna', 'Cycling through the wine route'],
  },
  {
    id: 11,
    position: { lat: -34.103892166238865, lng:  18.403134469287952},
    list_date: '2023-07-12',
    title: 'Modern Loft',
    location: 'Cape Town, SA',
    type: 'Villa',
    beds: 2,
    bathrooms: 1,
    price: 'R200/night',
    availablefrom: '2023-10-05',
    availableto: '2023-12-07',
    imageUrl: '/Images/property11.webp',
    amenities: ['Views', 'Balcony', 'Gym', 'Free Wi-Fi'],
    description:
      'Stay in this modern loft in the heart of Cape Town. Enjoy city views, a private balcony, and access to a fully equipped gym.',
    nearby: ['Explore V&A Waterfront', 'Hike Lion\'s Head', 'Visit Robben Island'],
  },
  {
    id: 12, 
    position: { lat: -28.152608952277077,  lng:  21.190574485609925},
    list_date: '2023-08-19',
    title: 'Charming Cottage',
    location: 'Upington, SA',
    type: 'Cabin',
    beds: 3,
    bathrooms: 2,
    price: 'R160/night',
    availablefrom: '2023-11-28',
    availableto: '2024-02-15',
    imageUrl: '/Images/property12.webp',
    amenities: ['Garden', 'Fireplace', 'BBQ Grill', 'Free Wi-Fi'],
    description:
      'Relax in this charming cottage in Upington. Enjoy a beautiful garden, a cozy fireplace, and a BBQ grill for outdoor cooking.',
    nearby: ['Visit National Zoological Gardens', 'Explore Freedom Park', 'Dine at local cafes'],
  },
  {
    id: 13,
    position: { lat: -29.466143007421188, lng:  29.26889853561007 },
    list_date: '2023-09-25',
    title: 'Riverside Cabin',
    location: 'Drakensberg, SA',
    type: 'Cabin',
    beds: 4,
    bathrooms: 2,
    price: 'R180/night',
    availablefrom: '2023-12-11',
    availableto: '2023-12-25',
    imageUrl: '/Images/property13.webp',
    amenities: ['Views', 'Hiking Trails', 'Fireplace', 'Free Wi-Fi'],
    description:
      'Experience nature in this riverside cabin in Drakensberg. Enjoy river views, hiking trails, and a cozy fireplace for cooler evenings.',
    nearby: ['Hike in the Drakensberg Mountains', 'Fly fishing in the river', 'Stargazing at night'],
  },
  {
    id: 14,
    position: { lat: -33.05780758259499,  lng: 18.063247126248505 }, 
    list_date: '2023-10-03',
    title: 'Historic Manor ',
    location: 'Langebaan, SA',
    type: 'House',
    beds: 6,
    bathrooms: 4,
    price: 'R250/night',
    availablefrom: '2023-12-16',
    availableto: '2024-01-15',
    imageUrl: '/Images/property14.webp',
    amenities: ['Historic Charm', 'Garden', 'Library', 'Free Wi-Fi'],
    description:
      'Step into history at this historic manor in Langebaan. Enjoy historic charm, a beautiful garden, and a library for reading and relaxation.',
    nearby: ['Wine tasting in local vineyards', 'Explore Langebaan museums', 'Cycling through the vineyards'],
  },
  {
    id: 15,
    position: { lat: -26.13877424520418, lng:  28.082297273687622 },
    list_date: '2023-11-28',
    title: 'Family Villa ',
    location: 'Johannesburg, SA',
    type: 'Villa',
    beds: 5,
    bathrooms: 3,
    price: 'R280/night',
    availablefrom: '2023-10-01',
    availableto: '2024-01-07',
    imageUrl: '/Images/property15.webp',
    amenities: ['Swimming Pool', 'Garden', 'BBQ Area', 'Free Wi-Fi'],
    description:
      'Enjoy family time at this spacious villa in Johannesburg. Swim in the pool, relax in the garden, and have a BBQ on the sunny terrace.',
    nearby: ['Visit the Apartheid Museum', 'Explore Gold Reef City', 'Shop at Sandton City Mall'],
  },
];



function Map({filters,startDate,endDate,locationQuery}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBTNr9tdH-cWOydONwKcWUlxkLdty4A3IU",
  });

  const [selectedProperty, setSelectedProperty] = useState(null);

   // Define a function to adjust the InfoWindow position
   const adjustInfoWindowPosition = (markerPosition) => {
    if (!markerPosition) return null;
    // Calculate the adjusted position, for example, move it 50 pixels up
    return { lat: markerPosition.lat + 0.005, lng: markerPosition.lng };
  };
  
  const filteredProperties = propertyListings.filter((property) => {
    const propertyPrice = parseFloat(property.price.split('R')[1]);
    const availableFromDate = new Date(property.availablefrom);
    const availableToDate = new Date(property.availableto);

    const meetsFilterCriteria =
      (!filters || Object.keys(filters).length === 0) ||
      ((!filters.minPrice || propertyPrice >= filters.minPrice) &&
        (!filters.maxPrice || propertyPrice <= filters.maxPrice) &&
        (!filters.minBeds || property.beds >= filters.minBeds) &&
        (!filters.minBathrooms || property.bathrooms >= filters.minBathrooms) &&
        (!filters.propertyTypes || filters.propertyTypes.length === 0 || filters.propertyTypes.includes(property.type)) &&
        (!filters.amenities || filters.amenities.length === 0 || filters.amenities.every((amenity) => property.amenities.includes(amenity))));

    const isWithinDateRange =
      (!startDate || !endDate) ||
      (availableFromDate <= endDate && availableToDate >= startDate);

      const matchesLocationQuery =
      !locationQuery ||
      property.location.toLowerCase().includes(locationQuery.toLowerCase());

    return meetsFilterCriteria && isWithinDateRange && matchesLocationQuery;
  });


 
return isLoaded ? (
  <>
    <GoogleMap
      center={center}
      styles={styles["hide"]}
      zoom={6}
      mapContainerClassName="map-canvas"
    >
      {filteredProperties.map((property) => (
        <Marker
          key={property.id}
          position={property.position}
          onClick={() => {
            setSelectedProperty(property);
          }}
        />
      ))}

      {selectedProperty && (
        <InfoWindow
        position={adjustInfoWindowPosition(selectedProperty.position)}
                  onCloseClick={() => {
            setSelectedProperty(null);
          }}
          
        >
          <div class="info-window">
          <button className="info-windowclose-button" onClick={() => setSelectedProperty(null)}>
        &times;
      </button>
      <div className="info-window-content">
        <img className="marker-image" src={selectedProperty.imageUrl} alt={selectedProperty.title} />
        <h2 className="marker-title">{selectedProperty.title}</h2>
        <p className="marker-type">
         {selectedProperty.type}
        </p>
        <p className="marker-price">
          {selectedProperty.price}
        </p>

      </div>
    </div>
        </InfoWindow>
      )}
    </GoogleMap>
  </>
) : (
  <></>
);
}

export default Map;