export interface PlantDetails {
    id: number,
    common_name: string,
    scientific_name: string[],
    family: string,
    origin: string[],
    type: string, //tree, etc
    dimension: string, //es: Height:  70 feet
    cycle: string, //perennial, annual, biennial, biannual
    propagation: string[],
    hardiness_location: {
      full_url: string,
      full_iframe: string
    },
    watering: string, //only minimum
    sunlight: string[], //full_shade, part_shade, sun-part_shade, full_sun
    maintenance: string, //Low, Medium, High, Average
    soil: string[],
    growth_rate: string,
    drought_tolerant: boolean, //resistenza alla siccità
    salt_tolerant: boolean,
    thorny: boolean, //spinoso
    invasive: boolean,
    tropical: boolean,
    indoor: boolean,
    care_level: string,
    flowers: boolean,
    edible_fruit: boolean,
    leaf_color: string[],
    //----- DESCRIZIONE -----
    description: string,
    //----- IMMAGINI -----
    default_image: {
      original_url: string
    }
}
