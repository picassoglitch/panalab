// Portafolio según "Propuesta contenidos y landing Panalab 2026":
// capilar (línea Aminoter, Complidermol) y piel sensible (Proavenal, Lactokey) usan nombres reales.
// Orden de UNIVERSES = orden del menú superior: Acné · Capilar · Fotoprotección · Piel sensible · Primeras arrugas.
// Acné usa la línea real Cuteral (crema, wash y tabletas) con fotos en public/productos/<slug>/.
// Todos los universos usan nombres, presentaciones y fotos reales de producto.
// Descripciones y claims pendientes de validación médica/regulatoria antes de producción.

export interface HeroSlide {
  src: string;
  alt: string;
}

// Banners de campaña del hero. El primero es "La ciencia que vive en tu piel".
// Para agregar más, coloca la imagen en public/hero/ y añade su entrada aquí.
export const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/hero/la-ciencia-que-vive-en-tu-piel.webp",
    alt: "La ciencia que vive en tu piel — Laboratorios Panalab",
  },
];

export interface Universe {
  slug: string;
  nav: string;
  title: string;
  intro: string;
  needs: string[];
  emoji: string;
  tone: string;
}

export interface Product {
  slug: string;
  universe: string;
  line: string;
  name: string;
  benefit: string;
  usage: string;
  ingredients: string[];
  science: string;
  legend?: string;
  badge?: "Best seller" | "Nuevo";
  // Rutas bajo public/. La primera es la foto principal (tarjeta y ficha).
  images?: string[];
}

export interface ProductLine {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

// Líneas con sección propia dentro de su universo. Se agrupan por Product.line.
export const PRODUCT_LINES: ProductLine[] = [
  {
    id: "CUTERAL",
    name: "Cuteral",
    tagline: "Entendemos el lenguaje de la piel",
    description:
      "Línea Panalab para piel grasa y con tendencia acneica: limpieza, hidratación con protección solar y un suplemento oral que acompaña la rutina desde adentro.",
  },
  {
    id: "AMINOTER",
    name: "Aminoter",
    tagline: "Reparación y protección capilar",
    description:
      "Línea Panalab para el cabello debilitado o en etapas de caída: shampoo, mascarilla y suero para el cuidado tópico, más cápsulas que acompañan la rutina desde adentro.",
  },
  {
    id: "COMPLIDERMOL",
    name: "Complidermol",
    tagline: "El clásico del cuidado capilar",
    description:
      "Suplemento alimenticio en cápsulas con larga trayectoria en el portafolio capilar Panalab para el cuidado del cabello y las uñas.",
  },
  {
    id: "MINERAL SAFE",
    name: "Mineral Safe",
    tagline: "Fotoprotección 100% mineral",
    description:
      "Línea Panalab de fotoprotección con filtro solar 100% mineral y protección de amplio espectro para uso diario. Incluye fluidos faciales de 50 mL y sticks de 10 g, con y sin color, libres de parabenos, siliconas, fragancia y derivados de petróleo.",
  },
  {
    id: "PROAVENAL",
    name: "Proavenal",
    tagline: "Emoliencia diaria con avena",
    description:
      "Línea emoliente Panalab con avena sativa para la piel seca, sensible o con tendencia atópica. Reúne crema, gel de ducha, shampoo y desodorante para construir una rutina suave de uso diario.",
  },
  {
    id: "LACTOKEY",
    name: "Lactokey",
    tagline: "Zinc y probióticos en sobres",
    description:
      "Suplemento alimenticio Panalab en sobres, con zinc y probióticos. Acompaña desde adentro las rutinas tópicas para piel sensible.",
  },
  {
    id: "VITANOIN",
    name: "Vitanoin",
    tagline: "Sueros faciales por necesidad",
    description:
      "Línea de sueros faciales Panalab en presentación de 30 mL. Cada referencia trabaja con activos distintos: antioxidantes con vitamina C, control de manchas e imperfecciones, alivio del enrojecimiento y efecto tensor.",
  },
  {
    id: "LERACO",
    name: "Leraco",
    tagline: "Antioxidantes desde adentro",
    description:
      "Suplemento alimenticio en cápsulas que acompaña la rutina de cuidado de la piel desde adentro, con antioxidantes, vitaminas y minerales.",
  },
];

export const UNIVERSES: Universe[] = [
  {
    slug: "acne",
    nav: "Acné",
    title: "Universo acné",
    intro:
      "El acné no se resuelve con recetas milagro. Se maneja con limpieza adecuada, ingredientes con respaldo y constancia. Aquí encuentras rutinas y productos pensados para pieles con tendencia acneica.",
    needs: [
      "Brotes en adolescencia",
      "Acné adulto",
      "Marcas y textura irregular",
    ],
    emoji: "✨",
    tone: "bg-[#fdf0ea]",
  },
  {
    slug: "capilar",
    nav: "Capilar",
    title: "Universo capilar",
    intro:
      "La caída y el debilitamiento del cabello tienen causas distintas: estacionales, hormonales o de hábitos. Aquí ordenamos la información para que entiendas qué le pasa a tu cabello y qué rutina puede ayudarte.",
    needs: [
      "Caída estacional o persistente",
      "Cabello debilitado o sin volumen",
      "Cuero cabelludo sensible",
    ],
    emoji: "💇",
    tone: "bg-[#e7eaf4]",
  },
  {
    slug: "fotoproteccion",
    nav: "Fotoprotección",
    title: "Fotoprotección",
    intro:
      "El sol es el principal factor de envejecimiento y daño cutáneo en México. La fotoprotección diaria es el hábito con mayor impacto en la salud de tu piel a largo plazo.",
    needs: [
      "Protección diaria urbana",
      "Piel expuesta al aire libre",
      "Prevención de manchas",
    ],
    emoji: "☀️",
    tone: "bg-[#fdf6e3]",
  },
  {
    slug: "piel-sensible",
    nav: "Piel sensible",
    title: "Piel sensible y atópica",
    intro:
      "La piel atópica y sensible necesita limpieza suave, hidratación constante y productos sin irritantes. Te ayudamos a construir una rutina prudente para ti o para tus hijos.",
    needs: [
      "Resequedad y comezón recurrente",
      "Piel atópica en niños",
      "Enrojecimiento e irritación frecuente",
    ],
    emoji: "🤲",
    tone: "bg-[#f2eef4]",
  },
  {
    slug: "primeras-arrugas",
    nav: "Primeras arrugas",
    title: "Primeras arrugas y antioxidantes",
    intro:
      "Entre los 25 y 40 años la piel empieza a perder firmeza y luminosidad. Los sérums y antioxidantes orales ayudan a mantener una piel saludable, siempre como parte de una rutina integral.",
    needs: [
      "Líneas de expresión tempranas",
      "Piel apagada o fatigada",
      "Prevención de fotoenvejecimiento",
    ],
    emoji: "🌿",
    tone: "bg-[#eef2f4]",
  },
];

export const PRODUCTS: Product[] = [
  {
    slug: "aminoter-max-shampoo",
    line: "AMINOTER",
    badge: "Best seller",
    universe: "capilar",
    name: "Aminoter MAX Shampoo",
    benefit:
      "Shampoo de reparación y protección capilar en microesferas. 150 mL.",
    usage:
      "Aplicar sobre cabello húmedo, masajear suavemente el cuero cabelludo y enjuagar.",
    ingredients: ["Complejo de aminoácidos", "Activos fortalecedores"],
    science:
      "Parte de la línea Aminoter, desarrollada para el cuidado integral del cabello debilitado o en etapas de caída.",
    images: [
      "/productos/aminoter-max-shampoo/1.webp",
      "/productos/aminoter-max-shampoo/2.webp",
    ],
  },
  {
    slug: "aminoter-mask",
    line: "AMINOTER",
    universe: "capilar",
    name: "Aminoter Mask",
    benefit:
      "Mascarilla capilar de fórmula mejorada para nutrir y reparar el cabello debilitado. 140 g.",
    usage:
      "Después del shampoo, aplicar de medios a puntas, dejar actuar unos minutos y enjuagar.",
    ingredients: ["Agentes acondicionadores", "Complejo nutritivo capilar"],
    science:
      "Complemento de la rutina Aminoter para devolver suavidad y fuerza a la fibra capilar.",
    images: ["/productos/aminoter-mask/1.webp"],
  },
  {
    slug: "aminoter-reparage",
    line: "AMINOTER",
    universe: "capilar",
    name: "Aminoter Reparage",
    benefit:
      "Suero capilar reparador para cabello dañado por procesos químicos o calor.",
    usage:
      "Aplicar según indicación del empaque sobre cabello limpio y húmedo.",
    ingredients: ["Complejo reparador", "Activos protectores"],
    science:
      "Formulado para ayudar a restaurar la estructura del cabello sometido a tintes, decoloración o herramientas de calor.",
    images: ["/productos/aminoter-reparage/1.webp"],
  },
  {
    slug: "aminoter",
    line: "AMINOTER",
    universe: "capilar",
    name: "Aminoter cápsulas",
    benefit:
      "Suplemento oral para acompañar el manejo de la caída de cabello desde adentro.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: [
      "L-Metionina",
      "L-Cistina",
      "Pantotenato de calcio",
      "Zinc",
      "Vitamina B6",
      "Biotina",
    ],
    science:
      "Suplemento de la línea capilar Panalab pensado para complementar rutinas tópicas en etapas de caída.",
    legend:
      "Este producto no es un medicamento. Si la caída persiste, consulte a su médico.",
    images: ["/productos/aminoter/1.webp", "/productos/aminoter/2.webp"],
  },
  {
    slug: "aminoter-d",
    line: "AMINOTER",
    badge: "Nuevo",
    universe: "capilar",
    name: "Aminoter D",
    benefit: "Suplemento capilar con vitamina D para necesidades específicas.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: ["Aminoácidos", "Vitamina D"],
    science:
      "Variante de la línea Aminoter oral que suma vitamina D al cuidado del cabello.",
    legend:
      "Este producto no es un medicamento. Consulte a su médico antes de iniciar cualquier suplemento.",
  },
  {
    slug: "complidermol",
    line: "COMPLIDERMOL",
    badge: "Best seller",
    universe: "capilar",
    name: "Complidermol 5α",
    benefit:
      "Suplemento oral de referencia para el cuidado del cabello y las uñas.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: ["Complejo nutricional capilar"],
    science:
      "Uno de los productos con mayor trayectoria del portafolio capilar Panalab.",
    legend: "Este producto no es un medicamento. Consulte a su médico.",
    images: ["/productos/complidermol/1.webp"],
  },
  {
    slug: "cuteral-wash",
    line: "CUTERAL",
    universe: "acne",
    name: "Cuteral Wash Gel limpiador",
    benefit:
      "Gel dermolimpiador probiótico para piel grasa y con tendencia acneica.",
    usage:
      "Usar mañana y noche sobre rostro húmedo, masajear suavemente y enjuagar. Evitar el contorno de ojos.",
    ingredients: ["Probióticos", "Agentes limpiadores suaves"],
    science:
      "Primer paso de la rutina Cuteral: limpia el exceso de grasa sin agredir la barrera cutánea. Presentación de 240 mL con dosificador.",
    legend: "El acné moderado o severo requiere valoración dermatológica.",
    images: [
      "/productos/cuteral-wash/1.webp",
      "/productos/cuteral-wash/2.webp",
    ],
  },
  {
    slug: "cuteral-crema-probiotic",
    line: "CUTERAL",
    universe: "acne",
    name: "Cuteral Crema Probiotic",
    benefit:
      "Crema facial hidratante y matificante con protección solar FPS 30.",
    usage:
      "Aplicar por la mañana sobre piel limpia como último paso de la rutina. Textura ligera de rápida absorción.",
    ingredients: ["Probióticos", "FPS 30", "Activos matificantes"],
    science:
      "Hidrata y matifica la piel grasa mientras aporta fotoprotección diaria. Dermatológicamente probada. Presentación de 40 mL.",
    legend: "El acné moderado o severo requiere valoración dermatológica.",
    images: [
      "/productos/cuteral-crema-probiotic/1.webp",
      "/productos/cuteral-crema-probiotic/2.webp",
    ],
  },
  {
    slug: "cuteral-tabletas",
    line: "CUTERAL",
    universe: "acne",
    name: "Cuteral tabletas",
    benefit:
      "Suplemento alimenticio con lisina, nicotinamida, zinc, cobre y ácido fólico.",
    usage:
      "Tomar según indicación del empaque o de su médico. Caja con 30 tabletas de 388 mg.",
    ingredients: ["Lisina", "Nicotinamida", "Zinc", "Cobre", "Ácido fólico"],
    science:
      "Complemento oral de la rutina Cuteral: nutrientes que participan en el equilibrio de la piel con tendencia acneica.",
    legend:
      "Este producto no es un medicamento. Consulte a su médico antes de iniciar cualquier suplemento.",
    images: [
      "/productos/cuteral-tabletas/1.webp",
      "/productos/cuteral-tabletas/2.webp",
    ],
  },
  {
    slug: "mineral-safe-oil-control-sin-color",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Oil Control FPS 50 Sin color",
    benefit:
      "Fotoprotector facial con filtro 100% mineral y acabado mate para piel grasa o mixta. 50 mL.",
    usage:
      "Aplicar por la mañana sobre piel limpia, como último paso de la rutina. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Filtro solar 100% mineral",
      "FPS 50",
      "Ácido hialurónico",
      "Efecto matificante",
      "Sin color",
    ],
    science:
      "Fotoprotector de uso diario con filtros minerales y protección de amplio espectro, formulado para pieles grasa o mixta. Su efecto matificante ayuda a controlar el brillo y el ácido hialurónico contribuye a mantener la piel hidratada.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-oil-control-sin-color/1.webp",
      "/productos/mineral-safe-oil-control-sin-color/2.webp",
    ],
  },
  {
    slug: "mineral-safe-oil-control-color-medio",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Oil Control FPS 50 Color medio",
    benefit:
      "Fotoprotector facial mineral con acabado mate y color medio para piel grasa o mixta. 50 mL.",
    usage:
      "Aplicar por la mañana sobre piel limpia y extender de manera uniforme. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Filtro solar 100% mineral",
      "FPS 50",
      "Ácido hialurónico",
      "Efecto matificante",
      "Color medio",
    ],
    science:
      "Versión con color medio del fotoprotector Oil Control, pensada para piel grasa o mixta que busca un acabado mate y un tono más uniforme. Aporta protección de amplio espectro en la rutina diaria.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-oil-control-color-medio/1.webp",
      "/productos/mineral-safe-oil-control-color-medio/2.webp",
    ],
  },
  {
    slug: "mineral-safe-fluido-sin-color",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Fluido FPS 50 Sin color",
    benefit:
      "Fluido facial con filtro solar 100% mineral y textura ligera de uso diario. 50 mL, sin color.",
    usage:
      "Aplicar cada mañana sobre piel limpia como último paso de la rutina. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Filtro solar 100% mineral",
      "FPS 50",
      "Tecnología Ronacare®",
      "Ingredientes 100% de origen natural",
      "Sin color",
    ],
    science:
      "Fluido de fotoprotección diaria con filtros minerales y protección de amplio espectro. Está formulado con ingredientes 100% de origen natural y libre de parabenos, siliconas, fragancia y derivados de petróleo.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-fluido-sin-color/1.webp",
      "/productos/mineral-safe-fluido-sin-color/2.webp",
    ],
  },
  {
    slug: "mineral-safe-fluido-color-ligero",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Fluido FPS 50 Color ligero",
    benefit:
      "Fluido facial mineral de textura ligera con color ligero para uso diario. 50 mL.",
    usage:
      "Aplicar cada mañana sobre piel limpia y extender de manera uniforme. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Filtro solar 100% mineral",
      "FPS 50",
      "Tecnología Ronacare®",
      "Ingredientes 100% de origen natural",
      "Color ligero",
    ],
    science:
      "Fluido de fotoprotección diaria con filtros minerales y protección de amplio espectro, en una tonalidad ligera que acompaña tonos de piel claros. Libre de parabenos, siliconas, fragancia y derivados de petróleo.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-fluido-color-ligero/1.webp",
      "/productos/mineral-safe-fluido-color-ligero/2.webp",
    ],
  },
  {
    slug: "mineral-safe-fluido-color-medio",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Fluido FPS 50 Color medio",
    benefit:
      "Fluido facial mineral de textura ligera con color medio para uso diario. 50 mL.",
    usage:
      "Aplicar cada mañana sobre piel limpia y extender de manera uniforme. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Filtro solar 100% mineral",
      "FPS 50",
      "Tecnología Ronacare®",
      "Ingredientes 100% de origen natural",
      "Color medio",
    ],
    science:
      "Fluido de fotoprotección diaria con filtros minerales y protección de amplio espectro, en una tonalidad media que acompaña tonos de piel intermedios. Libre de parabenos, siliconas, fragancia y derivados de petróleo.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-fluido-color-medio/1.webp",
      "/productos/mineral-safe-fluido-color-medio/2.webp",
    ],
  },
  {
    slug: "mineral-safe-stick-color-ligero",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Stick FPS 50+ Color ligero",
    benefit:
      "Stick de protector solar mineral de muy alta protección, con color ligero. 10 g.",
    usage:
      "Deslizar directamente sobre rostro, orejas, nariz u otras zonas expuestas. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Protector solar mineral",
      "FPS 50+",
      "Muy alta protección",
      "Amplio espectro UVA/UVB",
      "Apto para pieles sensibles",
    ],
    science:
      "Formato en stick para llevar la fotoprotección a las zonas más expuestas del rostro y retocarla durante el día. Ofrece protección de amplio espectro UVA/UVB y es apto para pieles sensibles.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-stick-color-ligero/1.webp",
      "/productos/mineral-safe-stick-color-ligero/2.webp",
    ],
  },
  {
    slug: "mineral-safe-stick-color-medio",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Stick FPS 50 Color medio",
    benefit:
      "Stick de protector solar mineral de alta protección, con color medio. 10 g.",
    usage:
      "Deslizar directamente sobre rostro, orejas, nariz u otras zonas expuestas. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Protector solar mineral",
      "FPS 50",
      "Alta protección",
      "Amplio espectro UVA/UVB",
      "Apto para pieles sensibles",
    ],
    science:
      "Formato en stick para aplicar y retocar la fotoprotección en las zonas más expuestas del rostro. Ofrece protección de amplio espectro UVA/UVB en una tonalidad media y es apto para pieles sensibles.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora.",
    images: [
      "/productos/mineral-safe-stick-color-medio/1.webp",
      "/productos/mineral-safe-stick-color-medio/2.webp",
    ],
  },
  {
    slug: "mineral-safe-stick-kids",
    line: "MINERAL SAFE",
    universe: "fotoproteccion",
    name: "Mineral Safe Stick Kids FPS 50+",
    benefit:
      "Stick de protector solar mineral de muy alta protección para niños y familia. 10 g.",
    usage:
      "Deslizar sobre rostro, orejas, nariz y hombros antes de salir. Reaplicar cada 2 a 4 horas de exposición.",
    ingredients: [
      "Protector solar mineral",
      "FPS 50+",
      "Muy alta protección",
      "Amplio espectro UVA/UVB",
      "Apto para pieles sensibles",
    ],
    science:
      "Stick pensado para la piel de niños y para el uso de toda la familia, en un formato fácil de aplicar y de llevar. Ofrece muy alta protección de amplio espectro UVA/UVB y es apto para pieles sensibles.",
    legend:
      "La fotoprotección no sustituye otras medidas: evite la exposición prolongada al sol y use ropa protectora. En menores de 6 meses, consulte a su médico.",
    images: [
      "/productos/mineral-safe-stick-kids/1.webp",
      "/productos/mineral-safe-stick-kids/2.webp",
    ],
  },
  {
    slug: "proavenal-crema-emoliente",
    line: "PROAVENAL",
    badge: "Best seller",
    universe: "piel-sensible",
    name: "Proavenal Crema Emoliente",
    benefit:
      "Crema emoliente para piel seca, sensible o con tendencia atópica. 250 g.",
    usage:
      "Aplicar 1 a 2 veces al día sobre piel limpia, de preferencia después del baño y con la piel aún húmeda.",
    ingredients: ["Avena", "Omegatopic®", "Agentes emolientes"],
    science:
      "Crema de la línea Proavenal Omegatopic, formulada para ayudar a mantener hidratada y protegida la barrera cutánea. Su textura emoliente permite el uso frecuente, incluida la piel de los niños.",
    legend:
      "En caso de dermatitis diagnosticada, siga las indicaciones de su médico.",
    images: [
      "/productos/proavenal-crema-emoliente/1.webp",
      "/productos/proavenal-crema-emoliente/2.webp",
    ],
  },
  {
    slug: "proavenal-gel-de-ducha",
    line: "PROAVENAL",
    universe: "piel-sensible",
    name: "Proavenal Syndet Gel de Ducha",
    benefit:
      "Gel de ducha syndet con avena sativa para la limpieza diaria de piel seca y sensible. 300 mL.",
    usage:
      "Aplicar sobre la piel húmeda durante el baño, masajear suavemente y enjuagar. De uso diario.",
    ingredients: [
      "Avena sativa",
      "Complejo ProRepair-B5",
      "Harina de soya",
      "Alantoína",
    ],
    science:
      "Limpiador syndet, sin jabón, con extracto de avena sativa y complejo ProRepair-B5 para un efecto emoliente durante el baño. Está pensado para la higiene diaria de la piel seca, sensible o con tendencia atópica.",
    legend:
      "En caso de dermatitis diagnosticada, siga las indicaciones de su médico.",
    images: [
      "/productos/proavenal-gel-de-ducha/1.webp",
      "/productos/proavenal-gel-de-ducha/2.webp",
    ],
  },
  {
    slug: "proavenal-shampoo",
    line: "PROAVENAL",
    universe: "piel-sensible",
    name: "Proavenal Shampoo",
    benefit:
      "Shampoo suave para el lavado frecuente del cabello y el cuero cabelludo sensible. 150 mL.",
    usage:
      "Aplicar sobre el cabello húmedo, masajear suavemente el cuero cabelludo y enjuagar. Repetir si es necesario.",
    ingredients: ["Avena", "Agentes limpiadores suaves"],
    science:
      "Shampoo de la línea emoliente Proavenal, pensado para el aseo del cabello cuando el cuero cabelludo está seco o se irrita con facilidad. Su fórmula suave permite el uso frecuente.",
    images: [
      "/productos/proavenal-shampoo/1.webp",
      "/productos/proavenal-shampoo/2.webp",
    ],
  },
  {
    slug: "proavenal-desodorante",
    line: "PROAVENAL",
    universe: "piel-sensible",
    name: "Proavenal Desodorante Roll-On",
    benefit: "Desodorante roll-on con pH 5.5 para axilas sensibles. 90 mL.",
    usage:
      "Aplicar una capa delgada sobre la axila limpia y seca. Evitar su uso inmediatamente después del rasurado.",
    ingredients: [
      "pH 5.5",
      "Agentes desodorantes",
      "Apto para axilas sensibles",
    ],
    science:
      "Desodorante roll-on con pH 5.5, cercano al de la piel, formulado para axilas que se irritan con facilidad. Completa la rutina Proavenal en zonas de piel delgada y sensible.",
    images: [
      "/productos/proavenal-desodorante/1.webp",
      "/productos/proavenal-desodorante/2.webp",
    ],
  },
  {
    slug: "lactokey",
    line: "LACTOKEY",
    universe: "piel-sensible",
    name: "Lactokey",
    benefit:
      "Suplemento alimenticio con zinc y probióticos. Caja con 30 sobres de 2.0 g.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: ["Zinc", "Probióticos", "Sobres de 2.0 g"],
    science:
      "Suplemento alimenticio en sobres que aporta zinc, mineral que contribuye al mantenimiento de la piel en condiciones normales. Acompaña desde adentro las rutinas tópicas para piel sensible.",
    legend:
      "Este producto no es un medicamento. Consulte a su médico antes de iniciar cualquier suplemento.",
    images: ["/productos/lactokey/1.webp", "/productos/lactokey/2.webp"],
  },
  {
    slug: "vitanoin-c5-serum",
    line: "VITANOIN",
    universe: "primeras-arrugas",
    name: "Vitanoin C5 Serum",
    benefit:
      "Suero facial antioxidante con vitamina C al 5% y vitamina E al 1%. 30 mL.",
    usage:
      "Aplicar por la mañana sobre piel limpia, antes del fotoprotector. No sustituye al protector solar.",
    ingredients: [
      "Vitamina C 5%",
      "Tetraisopalmitato de ascorbilo",
      "Vitamina E 1%",
      "Complejo de siliconas",
    ],
    science:
      "Suero de textura homogénea con vitamina C en forma de tetraisopalmitato de ascorbilo, un derivado óleo-soluble que el empaque describe como más estable frente a la oxidación. Los antioxidantes tópicos complementan la fotoprotección diaria; no la reemplazan.",
    images: [
      "/productos/vitanoin-c5-serum/1.webp",
      "/productos/vitanoin-c5-serum/2.webp",
    ],
  },
  {
    slug: "vitanoin-fec-15-serum",
    line: "VITANOIN",
    universe: "primeras-arrugas",
    name: "Vitanoin FEC 15 Serum",
    benefit:
      "Suero facial con ácido ferúlico, vitamina C al 15% y vitamina E al 1%. 30 mL.",
    usage:
      "Aplicar por la mañana sobre piel limpia, antes del fotoprotector. Es un complemento de la protección solar, no un sustituto.",
    ingredients: [
      "Ácido ferúlico",
      "Vitamina C 15%",
      "Vitamina E 1%",
      "Tetraisopalmitato de ascorbilo",
    ],
    science:
      "Combina ácido ferúlico con vitamina C óleo-soluble al 15% y vitamina E al 1%; según el empaque, la vitamina E potencializa el efecto de la vitamina C. Está pensado para acompañar la rutina diaria frente al estrés oxidativo, siempre junto con fotoprotector.",
    images: [
      "/productos/vitanoin-fec-15-serum/1.webp",
      "/productos/vitanoin-fec-15-serum/2.webp",
    ],
  },
  {
    slug: "vitanoin-an-serum",
    line: "VITANOIN",
    universe: "primeras-arrugas",
    name: "Vitanoin AN Serum",
    benefit:
      "Suero facial para control de manchas e imperfecciones en piel grasa. 30 mL.",
    usage:
      "Aplicar sobre piel limpia y seca según indicación del empaque. Durante el día, complete la rutina con fotoprotector.",
    ingredients: [
      "Ácido azelaico",
      "Ácido salicílico",
      "Niacinamida",
      "Zinc PCA",
      "Ácido hialurónico",
    ],
    science:
      "Fórmula descrita en el empaque para el control o asistencia en piel con grasa, puntos negros y propensa al acné. Combina ácido azelaico, ácido salicílico, niacinamida y zinc PCA con ácido hialurónico, que ayuda a retener la hidratación del rostro.",
    legend: "El acné moderado o severo requiere valoración dermatológica.",
    images: [
      "/productos/vitanoin-an-serum/1.webp",
      "/productos/vitanoin-an-serum/2.webp",
    ],
  },
  {
    slug: "vitanoin-ar-serum",
    line: "VITANOIN",
    universe: "primeras-arrugas",
    name: "Vitanoin AR Serum",
    benefit:
      "Suero facial para control del enrojecimiento y la irritación de la piel. 30 mL.",
    usage:
      "Aplicar sobre piel limpia según indicación del empaque. Si el día incluye exposición solar, complete con fotoprotector.",
    ingredients: [
      "Ácido azelaico",
      "Niacinamida",
      "Ácido hialurónico",
      "Enoxolona",
    ],
    science:
      "El empaque lo describe como un suero formulado para el control o asistencia en piel con enrojecimiento e irritación asociados a rosácea. Aporta ácido azelaico, niacinamida y enoxolona, junto con ácido hialurónico para sostener la hidratación.",
    legend:
      "Si tiene rosácea u otro padecimiento diagnosticado, siga las indicaciones de su médico.",
    images: [
      "/productos/vitanoin-ar-serum/1.webp",
      "/productos/vitanoin-ar-serum/2.webp",
    ],
  },
  {
    slug: "vitanoin-lifting-serum",
    line: "VITANOIN",
    universe: "primeras-arrugas",
    name: "Vitanoin Lifting",
    benefit:
      "Suero facial tensor con polipéptidos y efecto tensor inmediato. 30 mL.",
    usage:
      "Aplicar sobre el rostro limpio y seco, extendiendo de manera uniforme. No aplicar sobre piel irritada o lastimada.",
    ingredients: [
      "Polipéptidos",
      "Colágeno hidrolizado",
      "Ácido hialurónico",
      "Extracto de aloe",
      "Sin conservadores añadidos",
    ],
    science:
      "Suero tensor con polipéptidos (palmitoil tripéptido-1, palmitoil tetrapéptido-7 y dipéptido diaminobutiroil benzilamida diacetato) que, según el empaque, producen un efecto tensor inmediato. Se acompaña de colágeno hidrolizado y ácido hialurónico para mejorar la sensación de la piel.",
    legend:
      "No aplicar sobre piel irritada o lastimada. En caso de irritación, descontinúe su uso y consulte a su médico.",
    images: [
      "/productos/vitanoin-lifting-serum/1.webp",
      "/productos/vitanoin-lifting-serum/2.webp",
    ],
  },
  {
    slug: "vitanoin-blemish",
    line: "VITANOIN",
    universe: "primeras-arrugas",
    name: "Vitanoin Blemish",
    benefit:
      "Suero despigmentante facial para el cuidado de las manchas. 30 mL.",
    usage:
      "Aplicar sobre la zona con manchas según indicación del empaque, de preferencia por la noche. Use fotoprotector durante el día.",
    ingredients: ["Activo despigmentante"],
    science:
      "Suero despigmentante de la línea Vitanoin en presentación de 30 mL. El manejo de las manchas es gradual y depende de la constancia y de la fotoprotección diaria.",
    legend:
      "Las manchas persistentes o de aparición reciente requieren valoración dermatológica.",
    images: ["/productos/vitanoin-blemish/1.webp"],
  },
  {
    slug: "leraco",
    line: "LERACO",
    universe: "primeras-arrugas",
    name: "Leraco",
    benefit:
      "Suplemento alimenticio antioxidante. Frasco con 30 cápsulas de 873 mg cada una.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: [
      "Ácido alfa lipoico",
      "Omega 3",
      "Vitaminas C, E y D3",
      "L-cisteína",
      "Zinc y superóxido dismutasa",
    ],
    science:
      "Suplemento alimenticio a base de ácido alfa lipoico, omega 3, vitaminas E, C y D3, L-cisteína, zinc y superóxido dismutasa. Acompaña desde adentro los hábitos de fotoprotección y cuidado diario de la piel.",
    legend:
      "Este producto no es un medicamento. Consulte a su médico antes de iniciar cualquier suplemento.",
    images: ["/productos/leraco/1.webp", "/productos/leraco/2.webp"],
  },
];

export interface Marketplace {
  id: string;
  name: string;
  baseUrl: string;
}

export const MARKETPLACES: Marketplace[] = [
  {
    id: "amazon",
    name: "Amazon México",
    baseUrl: "https://www.amazon.com.mx/s?k=panalab",
  },
  {
    id: "mercadolibre",
    name: "Mercado Libre",
    baseUrl: "https://listado.mercadolibre.com.mx/panalab",
  },
  {
    id: "farmacias",
    name: "Farmacias y distribuidores",
    baseUrl: "https://www.google.com/maps/search/farmacia",
  },
];

export function productsByUniverse(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.universe === slug);
}

export function getUniverse(slug: string): Universe | undefined {
  return UNIVERSES.find((u) => u.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductLine(id: string): ProductLine | undefined {
  return PRODUCT_LINES.find((l) => l.id === id);
}

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Record<string, Faq[]> = {
  capilar: [
    {
      q: "¿Cuánto cabello es normal perder al día?",
      a: "Perder entre 50 y 100 cabellos al día se considera normal. Si notas una caída mayor durante más de 3 meses, mechones al peinarte o zonas con menos densidad, lo recomendable es una valoración con dermatólogo.",
    },
    {
      q: "¿La caída estacional es real?",
      a: "Sí. Muchas personas notan más caída en otoño y al final del verano, y suele estabilizarse sola en unas semanas. Una rutina de cuidado capilar puede acompañar esta etapa, pero si la caída persiste, consulte a su médico.",
    },
    {
      q: "¿Los suplementos capilares funcionan?",
      a: "Los suplementos aportan nutrientes que participan en el ciclo de crecimiento del cabello y pueden complementar el cuidado tópico. No son medicamentos ni sustituyen el diagnóstico de la causa de la caída. Consulte a su médico.",
    },
  ],
  "piel-sensible": [
    {
      q: "¿Cómo sé si mi piel (o la de mi hijo) es atópica?",
      a: "La piel atópica suele presentar resequedad persistente, comezón y brotes en zonas como pliegues de codos y rodillas. Solo un médico puede confirmar el diagnóstico; nuestras herramientas orientan, no diagnostican.",
    },
    {
      q: "¿Con qué frecuencia debo aplicar el emoliente?",
      a: "La constancia importa más que la cantidad: aplicar el emoliente 1 a 2 veces al día, idealmente después del baño con la piel aún húmeda, ayuda a mantener la barrera cutánea.",
    },
    {
      q: "¿El jabón común daña la piel sensible?",
      a: "Los jabones convencionales pueden alterar el pH y resecar. Para piel sensible se recomiendan limpiadores tipo syndet, sin fragancia y con pH fisiológico.",
    },
  ],
  acne: [
    {
      q: "¿Lavarse la cara más veces mejora el acné?",
      a: "No. El exceso de limpieza irrita y puede empeorar los brotes. Lo recomendable es limpiar dos veces al día con un producto adecuado para piel con tendencia acneica.",
    },
    {
      q: "¿El acné es solo cosa de adolescentes?",
      a: "No. El acné adulto es frecuente, especialmente en mujeres, y puede tener componentes hormonales. Si los brotes son frecuentes o dejan marcas, consulte a un dermatólogo.",
    },
    {
      q: "¿Debo exprimir los granitos?",
      a: "No: manipular las lesiones aumenta la inflamación y el riesgo de marcas. Un tratamiento localizado y una rutina constante son un mejor camino.",
    },
  ],
  fotoproteccion: [
    {
      q: "¿Cuándo se aplica el protector solar en el rostro?",
      a: "Cada mañana como último paso de la rutina, incluso en días nublados o dentro de casa si hay exposición a ventanas. Reaplicar cada 3 a 4 horas de exposición.",
    },
    {
      q: "¿Cuánto protector debo usar?",
      a: "Para el rostro, la referencia práctica son dos líneas de producto a lo largo de los dedos índice y medio. Usar menos cantidad reduce la protección real.",
    },
    {
      q: "¿Los niños necesitan un fotoprotector especial?",
      a: "Sí. La piel infantil es más sensible; se recomiendan fórmulas pediátricas y evitar la exposición directa en menores de 6 meses. Consulte a su pediatra.",
    },
  ],
  "primeras-arrugas": [
    {
      q: "¿A qué edad conviene empezar con antioxidantes?",
      a: "No hay una edad única: los antioxidantes son un buen complemento desde los 25 años como prevención, siempre acompañados de fotoprotección diaria.",
    },
    {
      q: "¿La vitamina C se usa de día o de noche?",
      a: "Generalmente por la mañana, antes del fotoprotector, para complementar la defensa frente a radicales libres generados por sol y contaminación.",
    },
    {
      q: "¿Los suplementos antioxidantes sustituyen al fotoprotector?",
      a: "No. Los antioxidantes orales complementan la fotoprotección, nunca la sustituyen. Este tipo de productos no son medicamentos; consulte a su médico.",
    },
  ],
};

export interface Story {
  quote: string;
  author: string;
  tone: string;
}

export const STORIES: Story[] = [
  {
    quote:
      "Después de meses de probar de todo, entendí que mi piel no necesitaba más productos, sino los correctos.",
    author: "Mariana, 27 · Acné adulto",
    tone: "bg-[#fdf0ea]",
  },
  {
    quote:
      "La piel de mi hijo dejó de ser un motivo de angustia cuando aprendimos a cuidarla todos los días, no solo en las crisis.",
    author: "Rodrigo, 35 · Papá de un niño con piel atópica",
    tone: "bg-[#f2eef4]",
  },
  {
    quote:
      "Ver menos cabello en la almohada cada mañana me devolvió una tranquilidad que no sabía que había perdido.",
    author: "Carla, 42 · Caída estacional",
    tone: "bg-[#e7eaf4]",
  },
];
