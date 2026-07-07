// Contenido de demostración: nombres, descripciones y enlaces de compra son
// provisionales hasta recibir el contenido aprobado por marketing y validación médica.

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
  name: string;
  benefit: string;
  usage: string;
  ingredients: string[];
  science: string;
  legend?: string;
}

export const UNIVERSES: Universe[] = [
  {
    slug: "cabello",
    nav: "Cabello",
    title: "Universo capilar",
    intro:
      "La caída y el debilitamiento del cabello tienen causas distintas: estacionales, hormonales o de hábitos. Aquí ordenamos la información para que entiendas qué le pasa a tu cabello y qué rutina puede ayudarte.",
    needs: [
      "Caída estacional o persistente",
      "Cabello debilitado o sin volumen",
      "Cuero cabelludo sensible",
    ],
    emoji: "💇",
    tone: "bg-[#eef4ee]",
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
    slug: "sol",
    nav: "Sol",
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
    slug: "shampoo-fortalecedor",
    universe: "cabello",
    name: "Shampoo Fortalecedor Capilar",
    benefit: "Limpia suavemente y ayuda a reducir la caída por quiebre.",
    usage: "Aplicar sobre cabello húmedo, masajear y enjuagar. Uso diario o alternado.",
    ingredients: ["Biotina", "Pantenol", "Extracto de saw palmetto"],
    science:
      "Fórmula desarrollada para fortalecer la fibra capilar y cuidar el cuero cabelludo, con ingredientes de uso respaldado en cuidado capilar.",
  },
  {
    slug: "locion-capilar",
    universe: "cabello",
    name: "Loción Capilar Anticaída",
    benefit: "Complemento tópico para etapas de caída estacional o persistente.",
    usage: "Aplicar sobre cuero cabelludo seco por las noches, sin enjuague.",
    ingredients: ["Cafeína", "Niacinamida", "Complejo vitamínico"],
    science:
      "Loción de uso tópico pensada para acompañar rutinas capilares. Si la caída es persistente, la valoración con un dermatólogo es el paso correcto.",
    legend: "Si la caída persiste más de 3 meses, consulte a su médico.",
  },
  {
    slug: "crema-emoliente",
    universe: "piel-sensible",
    name: "Crema Emoliente Piel Atópica",
    benefit: "Hidratación intensiva para piel seca, sensible o con tendencia atópica.",
    usage: "Aplicar 1 a 2 veces al día sobre piel limpia, idealmente después del baño.",
    ingredients: ["Ceramidas", "Manteca de karité", "Avena coloidal"],
    science:
      "Emoliente sin fragancia formulado para restaurar la barrera cutánea, apto para uso frecuente en piel sensible, incluida la de los niños.",
    legend: "En caso de dermatitis diagnosticada, siga las indicaciones de su médico.",
  },
  {
    slug: "syndet-limpiador",
    universe: "piel-sensible",
    name: "Limpiador Syndet Suave",
    benefit: "Limpieza sin jabón que respeta la barrera de la piel.",
    usage: "Usar en rostro y cuerpo durante el baño, enjuagar con agua tibia.",
    ingredients: ["Base syndet pH fisiológico", "Glicerina"],
    science:
      "Los limpiadores syndet mantienen el pH natural de la piel y evitan la resequedad que causan los jabones convencionales.",
  },
  {
    slug: "gel-limpiador-acne",
    universe: "acne",
    name: "Gel Limpiador Piel Grasa",
    benefit: "Limpieza profunda sin resecar, para piel con tendencia acneica.",
    usage: "Usar mañana y noche sobre rostro húmedo, evitar el contorno de ojos.",
    ingredients: ["Ácido salicílico", "Zinc PCA", "Niacinamida"],
    science:
      "El ácido salicílico ayuda a destapar poros y regular el exceso de grasa; el zinc contribuye a calmar la piel.",
    legend: "El acné moderado o severo requiere valoración dermatológica.",
  },
  {
    slug: "gel-secativo",
    universe: "acne",
    name: "Gel Secativo Localizado",
    benefit: "Tratamiento puntual para brotes visibles.",
    usage: "Aplicar una capa fina sobre el brote, 1 a 2 veces al día.",
    ingredients: ["Peróxido de benzoilo baja concentración", "Aloe vera"],
    science:
      "Uso localizado para acompañar la rutina de limpieza. No sustituye tratamientos indicados por un dermatólogo.",
    legend: "Consulte a su médico si los brotes no mejoran en 4 semanas.",
  },
  {
    slug: "fotoprotector-facial",
    universe: "sol",
    name: "Fotoprotector Facial FPS 50+",
    benefit: "Protección diaria de amplio espectro con acabado ligero.",
    usage: "Aplicar cada mañana como último paso de la rutina; reaplicar cada 3 a 4 horas de exposición.",
    ingredients: ["Filtros UVA/UVB amplio espectro", "Vitamina E"],
    science:
      "La fotoprotección diaria reduce el daño acumulado por radiación solar, principal causa de fotoenvejecimiento y manchas.",
  },
  {
    slug: "fotoprotector-corporal",
    universe: "sol",
    name: "Fotoprotector Corporal FPS 50",
    benefit: "Protección corporal resistente al agua para actividades al aire libre.",
    usage: "Aplicar 20 minutos antes de la exposición y reaplicar después de nadar o sudar.",
    ingredients: ["Filtros fotoestables", "Pantenol"],
    science:
      "Formulación resistente al agua pensada para el clima y estilo de vida de México.",
  },
  {
    slug: "serum-antioxidante",
    universe: "primeras-arrugas",
    name: "Sérum Antioxidante Vitamina C",
    benefit: "Luminosidad y defensa antioxidante para uso diario.",
    usage: "Aplicar por la mañana sobre piel limpia, antes del fotoprotector.",
    ingredients: ["Vitamina C estabilizada", "Ácido ferúlico", "Vitamina E"],
    science:
      "Los antioxidantes tópicos ayudan a neutralizar radicales libres generados por sol y contaminación.",
  },
  {
    slug: "antioxidante-oral",
    universe: "primeras-arrugas",
    name: "Antioxidante Oral Piel",
    benefit: "Suplemento para complementar el cuidado de la piel desde adentro.",
    usage: "Una cápsula al día con alimentos, o según indicación de su médico.",
    ingredients: ["Polypodium leucotomos", "Vitaminas C y E", "Zinc"],
    science:
      "Suplemento alimenticio que acompaña hábitos de fotoprotección y cuidado diario. No es un medicamento.",
    legend:
      "Este producto no es un medicamento. El consumo de este producto es responsabilidad de quien lo recomienda y de quien lo usa.",
  },
];

export interface Marketplace {
  id: string;
  name: string;
  baseUrl: string;
}

export const MARKETPLACES: Marketplace[] = [
  { id: "amazon", name: "Amazon México", baseUrl: "https://www.amazon.com.mx/s?k=panalab" },
  { id: "mercadolibre", name: "Mercado Libre", baseUrl: "https://listado.mercadolibre.com.mx/panalab" },
  { id: "farmacias", name: "Farmacias y distribuidores", baseUrl: "https://www.google.com/maps/search/farmacia" },
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
