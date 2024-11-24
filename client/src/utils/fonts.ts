import { Lato, Cormorant_Garamond } from "next/font/google";

export const lato = Lato({
    subsets: ['latin'],
    style: 'normal',
    weight: ["100", "300", "400", "700", "900"]
})

export const cormorantGaramond = Cormorant_Garamond({
    subsets: ['latin'],
    style: 'normal',
    weight: ["300", "400", "700", "500", "600"]
})