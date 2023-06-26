export interface Plants {
    id: number,
    common_name: string,
    scientific_name: string[],
    cycle: string, //perennial, annual, biennial, biannual
    watering: string, //only minimum
    sunlight: string[], //full_shade, part_shade, sun-part_shade, full_sun
    default_image: {
      original_url: string,
      small_url?: string
    }
}
