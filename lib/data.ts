// Portafolio según "Propuesta contenidos y landing Panalab 2026":
// capilar (línea Aminoter, Complidermol) y piel sensible (Proavenal, Lactokey) usan nombres reales.
// Acné, sol y primeras arrugas quedan con fichas provisionales hasta que marketing confirme SKUs.
// Descripciones y claims pendientes de validación médica/regulatoria antes de producción.

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
  provisional?: boolean;
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
    slug: "aminoter-max-shampoo",
    line: "AMINOTER",
    badge: "Best seller",
    universe: "cabello",
    name: "Aminoter MAX Shampoo",
    benefit: "Limpieza diaria que fortalece la fibra capilar y acompaña rutinas anticaída.",
    usage: "Aplicar sobre cabello húmedo, masajear suavemente el cuero cabelludo y enjuagar.",
    ingredients: ["Complejo de aminoácidos", "Activos fortalecedores"],
    science:
      "Parte de la línea Aminoter, desarrollada para el cuidado integral del cabello debilitado o en etapas de caída.",
  },
  {
    slug: "aminoter-mask",
    line: "AMINOTER",
    universe: "cabello",
    name: "Aminoter Mask",
    benefit: "Mascarilla de tratamiento para nutrir y reparar el cabello debilitado.",
    usage: "Después del shampoo, aplicar de medios a puntas, dejar actuar unos minutos y enjuagar.",
    ingredients: ["Agentes acondicionadores", "Complejo nutritivo capilar"],
    science:
      "Complemento de la rutina Aminoter para devolver suavidad y fuerza a la fibra capilar.",
  },
  {
    slug: "aminoter-reparage",
    line: "AMINOTER",
    universe: "cabello",
    name: "Aminoter Reparage",
    benefit: "Tratamiento reparador para cabello dañado por procesos químicos o calor.",
    usage: "Aplicar según indicación del empaque sobre cabello limpio y húmedo.",
    ingredients: ["Complejo reparador", "Activos protectores"],
    science:
      "Formulado para ayudar a restaurar la estructura del cabello sometido a tintes, decoloración o herramientas de calor.",
  },
  {
    slug: "aminoter",
    line: "AMINOTER",
    universe: "cabello",
    name: "Aminoter",
    benefit: "Suplemento oral para acompañar el manejo de la caída de cabello desde adentro.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: ["Aminoácidos", "Vitaminas y minerales"],
    science:
      "Suplemento de la línea capilar Panalab pensado para complementar rutinas tópicas en etapas de caída.",
    legend:
      "Este producto no es un medicamento. Si la caída persiste, consulte a su médico.",
  },
  {
    slug: "aminoter-d",
    line: "AMINOTER",
    badge: "Nuevo",
    universe: "cabello",
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
    universe: "cabello",
    name: "Complidermol",
    benefit: "Suplemento oral de referencia para el cuidado del cabello y las uñas.",
    usage: "Tomar según indicación del empaque o de su médico.",
    ingredients: ["Complejo nutricional capilar"],
    science:
      "Uno de los productos con mayor trayectoria del portafolio capilar Panalab.",
    legend:
      "Este producto no es un medicamento. Consulte a su médico.",
  },
  {
    slug: "proavenal",
    line: "PROAVENAL",
    badge: "Best seller",
    universe: "piel-sensible",
    name: "Proavenal",
    benefit: "Línea emoliente para piel seca, sensible o con tendencia atópica.",
    usage: "Aplicar 1 a 2 veces al día sobre piel limpia, idealmente después del baño.",
    ingredients: ["Avena", "Agentes emolientes e hidratantes"],
    science:
      "Línea desarrollada para restaurar y proteger la barrera cutánea, apta para uso frecuente, incluida la piel de los niños.",
    legend: "En caso de dermatitis diagnosticada, siga las indicaciones de su médico.",
  },
  {
    slug: "lactokey",
    line: "LACTOKEY",
    universe: "piel-sensible",
    name: "Lactokey",
    benefit: "Hidratación y renovación suave para piel sensible o reseca.",
    usage: "Aplicar sobre la piel limpia según indicación del empaque.",
    ingredients: ["Activos hidratantes", "Agentes renovadores suaves"],
    science:
      "Línea Panalab enfocada en mantener la piel hidratada y flexible respetando su equilibrio natural.",
  },
  {
    slug: "gel-limpiador-acne",
    line: "PANALAB",
    universe: "acne",
    name: "Gel Limpiador Piel Grasa",
    benefit: "Limpieza profunda sin resecar, para piel con tendencia acneica.",
    usage: "Usar mañana y noche sobre rostro húmedo, evitar el contorno de ojos.",
    ingredients: ["Ácido salicílico", "Zinc PCA", "Niacinamida"],
    science:
      "El ácido salicílico ayuda a destapar poros y regular el exceso de grasa; el zinc contribuye a calmar la piel.",
    legend: "El acné moderado o severo requiere valoración dermatológica.",
    provisional: true,
  },
  {
    slug: "gel-secativo",
    line: "PANALAB",
    universe: "acne",
    name: "Gel Secativo Localizado",
    benefit: "Tratamiento puntual para brotes visibles.",
    usage: "Aplicar una capa fina sobre el brote, 1 a 2 veces al día.",
    ingredients: ["Peróxido de benzoilo baja concentración", "Aloe vera"],
    science:
      "Uso localizado para acompañar la rutina de limpieza. No sustituye tratamientos indicados por un dermatólogo.",
    legend: "Consulte a su médico si los brotes no mejoran en 4 semanas.",
    provisional: true,
  },
  {
    slug: "fotoprotector-facial",
    line: "PANALAB",
    universe: "sol",
    name: "Fotoprotector Facial FPS 50+",
    benefit: "Protección diaria de amplio espectro con acabado ligero.",
    usage: "Aplicar cada mañana como último paso de la rutina; reaplicar cada 3 a 4 horas de exposición.",
    ingredients: ["Filtros UVA/UVB amplio espectro", "Vitamina E"],
    science:
      "La fotoprotección diaria reduce el daño acumulado por radiación solar, principal causa de fotoenvejecimiento y manchas.",
    provisional: true,
  },
  {
    slug: "fotoprotector-corporal",
    line: "PANALAB",
    universe: "sol",
    name: "Fotoprotector Corporal FPS 50",
    benefit: "Protección corporal resistente al agua para actividades al aire libre.",
    usage: "Aplicar 20 minutos antes de la exposición y reaplicar después de nadar o sudar.",
    ingredients: ["Filtros fotoestables", "Pantenol"],
    science:
      "Formulación resistente al agua pensada para el clima y estilo de vida de México.",
    provisional: true,
  },
  {
    slug: "serum-antioxidante",
    line: "PANALAB",
    universe: "primeras-arrugas",
    name: "Sérum Antioxidante",
    benefit: "Luminosidad y defensa antioxidante para uso diario.",
    usage: "Aplicar por la mañana sobre piel limpia, antes del fotoprotector.",
    ingredients: ["Vitamina C estabilizada", "Vitamina E"],
    science:
      "Los antioxidantes tópicos ayudan a neutralizar radicales libres generados por sol y contaminación.",
    provisional: true,
  },
  {
    slug: "antioxidante-oral",
    line: "PANALAB",
    universe: "primeras-arrugas",
    name: "Antioxidante Oral",
    benefit: "Suplemento para complementar el cuidado de la piel desde adentro.",
    usage: "Una cápsula al día con alimentos, o según indicación de su médico.",
    ingredients: ["Antioxidantes", "Vitaminas C y E", "Zinc"],
    science:
      "Suplemento alimenticio que acompaña hábitos de fotoprotección y cuidado diario. No es un medicamento.",
    legend:
      "Este producto no es un medicamento. El consumo de este producto es responsabilidad de quien lo recomienda y de quien lo usa.",
    provisional: true,
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

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Record<string, Faq[]> = {
  cabello: [
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
  sol: [
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
    tone: "bg-[#eef4ee]",
  },
];
