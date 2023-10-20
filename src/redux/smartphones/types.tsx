export interface SmartphoneSliceState {
    items: Smartphone[]
}

export type Smartphone = {
    id: string,
    name: string,
    brand: string,
    screenType: string,
    screenTypeFull: string,
    screenSize: number,
    screenResolution: string,
    processor: string,
    ram: number,
    internalStorage: number,
    networkSupport: string,
    dimensions: {
      width: number,
      height: number,
      thickness: number
    },
    price: number,
    rating: number,
    fingerprintScanner: string,
    img: string
  }