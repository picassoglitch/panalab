// Directorio DEMO de especialistas aliados para el módulo Derma Finder.
// Todos los nombres, direcciones y códigos postales son ficticios y se usan
// solo para maquetar la experiencia. Este archivo debe reemplazarse por la
// base de datos real de dermatólogos y clínicas aliadas que entregue el cliente.

export type Foco = "acne" | "capilar" | "atopia" | "pediatria";

export interface Especialista {
  id: string;
  nombre: string;
  especialidad: "Dermatología" | "Pediatría" | "Dermatología pediátrica";
  focos: Foco[];
  ciudad: string;
  estado: string;
  cp: string;
  colonia: string;
}

export const FOCOS_LABELS: Record<string, string> = {
  acne: "Acné",
  capilar: "Capilar",
  atopia: "Piel atópica",
  pediatria: "Pediatría",
};

export const ESPECIALISTAS: Especialista[] = [
  {
    id: "esp-01",
    nombre: "Dra. Valeria Ontiveros",
    especialidad: "Dermatología",
    focos: ["acne", "capilar"],
    ciudad: "Ciudad de México",
    estado: "CDMX",
    cp: "06700",
    colonia: "Roma Norte",
  },
  {
    id: "esp-02",
    nombre: "Dr. Emilio Zaragoza",
    especialidad: "Dermatología",
    focos: ["capilar"],
    ciudad: "Ciudad de México",
    estado: "CDMX",
    cp: "03100",
    colonia: "Del Valle Centro",
  },
  {
    id: "esp-03",
    nombre: "Dra. Renata Villaseñor",
    especialidad: "Dermatología pediátrica",
    focos: ["atopia", "pediatria"],
    ciudad: "Ciudad de México",
    estado: "CDMX",
    cp: "11550",
    colonia: "Polanco",
  },
  {
    id: "esp-04",
    nombre: "Dr. Sebastián Argüelles",
    especialidad: "Pediatría",
    focos: ["pediatria", "atopia"],
    ciudad: "Ciudad de México",
    estado: "CDMX",
    cp: "04100",
    colonia: "Coyoacán Centro",
  },
  {
    id: "esp-05",
    nombre: "Dra. Camila Urdiales",
    especialidad: "Dermatología",
    focos: ["acne", "atopia"],
    ciudad: "Guadalajara",
    estado: "Jalisco",
    cp: "44600",
    colonia: "Ladrón de Guevara",
  },
  {
    id: "esp-06",
    nombre: "Dr. Rodrigo Anzaldúa",
    especialidad: "Dermatología",
    focos: ["capilar", "acne"],
    ciudad: "Guadalajara",
    estado: "Jalisco",
    cp: "45040",
    colonia: "Chapalita",
  },
  {
    id: "esp-07",
    nombre: "Dra. Fernanda Iturbide",
    especialidad: "Dermatología pediátrica",
    focos: ["pediatria", "atopia"],
    ciudad: "Zapopan",
    estado: "Jalisco",
    cp: "45116",
    colonia: "Puerta de Hierro",
  },
  {
    id: "esp-08",
    nombre: "Dr. Alonso Cárdenas",
    especialidad: "Dermatología",
    focos: ["acne", "capilar"],
    ciudad: "San Pedro Garza García",
    estado: "Nuevo León",
    cp: "66220",
    colonia: "Del Valle",
  },
  {
    id: "esp-09",
    nombre: "Dra. Marcela Treviño",
    especialidad: "Dermatología",
    focos: ["atopia", "acne"],
    ciudad: "Monterrey",
    estado: "Nuevo León",
    cp: "64060",
    colonia: "Obispado",
  },
  {
    id: "esp-10",
    nombre: "Dr. Iván Sepúlveda",
    especialidad: "Pediatría",
    focos: ["pediatria"],
    ciudad: "Monterrey",
    estado: "Nuevo León",
    cp: "64710",
    colonia: "Mitras Centro",
  },
  {
    id: "esp-11",
    nombre: "Dra. Paulina Escamilla",
    especialidad: "Dermatología",
    focos: ["acne", "capilar", "atopia"],
    ciudad: "Puebla",
    estado: "Puebla",
    cp: "72550",
    colonia: "La Paz",
  },
  {
    id: "esp-12",
    nombre: "Dr. Mauricio Peniche",
    especialidad: "Dermatología pediátrica",
    focos: ["pediatria", "atopia", "acne"],
    ciudad: "Mérida",
    estado: "Yucatán",
    cp: "97119",
    colonia: "Montejo",
  },
];
