export const locationGroups = [
  {
    category: "Westlands",
    items: [
      "Brookside", "General Mathenge", "Gigiri", "Hillview", 
      "Kitisuru", "Kyuna", "Lakeview", "Loresho", "Lower Kabete", 
      "Nyari", "Parklands", "Rhapta Road", "Riverside", "Rosslyn", 
      "Spring Valley", "Thigiri", "Westlands CBD"
    ]
  },
  {
    category: "Other Areas",
    items: [
      "Hurlingham", "Karen", "Karen Hardy", "Kiambu Road", 
      "Kileleshwa", "Kilimani", "Langata", "Lavington", 
      "Mombasa Properties", "Mombasa Road", "Mountain View", 
      "New Muthaiga", "Ngong Road", "Old Muthaiga", "Ridgeways", 
      "Ruaraka", "South B", "South C", "Statehouse Road", "Upperhill"
    ]
  }
];

// Flattens the groups into a single list for backward compatibility just in case
export const locations = locationGroups.flatMap(group => group.items);

// export const locations = [
//   'Kilimani',
//   'Kileleshwa', 
//   'Lavington',
//   'Karen',
//   'Westlands'
// ];

export const propertyTypes = [
  'All Types',
  'Apartment',
  'Villa',
  'Townhouse',
  'Penthouse',
  'Commercial',
  'Land'
];

export const amenitiesOptions = [
  "Parking",
  "High Speed Internet",
  "Gym",
  "24/7 Security",
  "Swimming Pool",
  "Garden",
  "Private Garden",
  "Garage",
  "CCTV Surveillance",
  "Smart Home System",
  "Backup Generator",
  "Elevator",
  "Balcony"
];

export const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under 10M', min: 0, max: 10000000 },
  { label: '10M - 20M', min: 10000000, max: 20000000 },
  { label: '20M - 30M', min: 20000000, max: 30000000 },
  { label: 'Above 30M', min: 30000000, max: Infinity }
];