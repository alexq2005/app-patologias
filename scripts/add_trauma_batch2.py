"""
Script to add 3 new trauma pathologies to pathologies.json:
  - pat_ahogamiento (Ahogamiento / Sumersion)
  - pat_amputacion_traumatica (Amputacion Traumatica)
  - pat_hipotermia (Hipotermia)
Also updates body_systems.json pathologyCount for traumatologico from 7 to 10.
"""

import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATHOLOGIES_FILE = os.path.join(BASE_DIR, "src", "data", "pathologies.json")
BODY_SYSTEMS_FILE = os.path.join(BASE_DIR, "src", "data", "body_systems.json")

new_pathologies = [
    {
        "id": "pat_ahogamiento",
        "nombre": "Ahogamiento (Sumersion)",
        "bodySystemId": "traumatologico",
        "definicion": "Proceso de deterioro respiratorio por sumersion o inmersion en un medio liquido. Puede ser fatal o no fatal, con un espectro que va desde la tos transitoria hasta el paro cardiorrespiratorio y la muerte. La asfixia por sumersion provoca hipoxia sistematica que afecta principalmente al cerebro y los pulmones. Es una de las principales causas de muerte accidental en niños menores de 5 años.",
        "epidemiologia": "Tercera causa de muerte por lesion no intencional a nivel mundial, con aproximadamente 236.000 muertes anuales segun la OMS. Incidencia mayor en niños de 1-4 años y adolescentes varones de 15-24 años. En Argentina, es la segunda causa de muerte accidental en menores de 15 años. El 80% de las victimas son varones. La tasa de mortalidad es mayor en paises de ingresos bajos y medios.",
        "factoresRiesgo": [
            "Edad extrema (niños menores de 5 años, adultos mayores)",
            "Sexo masculino (relacion 3:1)",
            "Consumo de alcohol y drogas recreativas",
            "Falta de supervision de menores en piletas y espejos de agua",
            "No saber nadar o sobreestimar la capacidad de natacion",
            "Epilepsia u otras condiciones con riesgo de perdida de conciencia",
            "Trauma cervical por zambullida en aguas poco profundas",
            "Hipotermia por inmersion prolongada en agua fria",
            "Sindrome de QT largo y otras arritmias cardiacas",
            "Ausencia de cercos perimetrales en piletas"
        ],
        "fisiopatologia": "La sumersion desencadena laringoespasmo reflejo inicial seguido de aspiracion de liquido (agua dulce o salada). El agua aspirada inactiva el surfactante pulmonar, colapsa los alveolos y genera atelectasias difusas. El resultado es un shunt intrapulmonar masivo con hipoxemia refractaria. El agua dulce se absorbe rapidamente hacia la circulacion (hipotonica), diluyendo el surfactante y causando edema alveolar. El agua salada (hipertonica) arrastra liquido hacia los alveolos por gradiente osmotico. Ambos mecanismos convergen en sindrome de distres respiratorio agudo (SDRA). La hipoxia prolongada causa daño cerebral isquemico-hipoxicocon muerte neuronal en 4-6 minutos sin oxigeno. La inmersion en agua fria (<20°C) puede activar el reflejo de inmersion mamifero (bradicardia, vasoconstriccion periferica, redistribucion sanguinea a organos vitales), lo que en niños pequeños puede conferir neuroproteccion parcial. La acidosis metabolica, la hiperpotasemia y las arritmias cardiacas completan el cuadro fisiopatologico.",
        "signosYSintomas": {
            "signos": [
                "Cianosis periferica y central",
                "Taquipnea o apnea segun severidad",
                "Estertores crepitantes bilaterales difusos",
                "Hipotension arterial y taquicardia compensadora",
                "Hipotermia (temperatura central < 35°C)",
                "Alteracion del nivel de conciencia (desde confusion hasta coma)",
                "Bradicardia o asistolia en casos severos",
                "Espuma rosada en via aerea (edema pulmonar)",
                "Midriasis bilateral en paro cardiorrespiratorio"
            ],
            "sintomas": [
                "Disnea intensa y sensacion de asfixia",
                "Tos persistente con expectoracion espumosa",
                "Dolor toracico opresivo",
                "Cefalea y confusion",
                "Nauseas y vomitos (por ingestion de agua)",
                "Ansiedad extrema y agitacion"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion de Szpilman (grados de severidad por ahogamiento)",
            "tipos": [
                {
                    "nombre": "Grado 1 (Rescate)",
                    "descripcion": "Tos sin espuma en via aerea. Auscultacion pulmonar normal. Paciente consciente y orientado. Observacion minima 6-8 horas"
                },
                {
                    "nombre": "Grado 2 (Leve)",
                    "descripcion": "Estertores crepitantes en algunos campos pulmonares. Paciente consciente. SpO2 > 90% con oxigeno suplementario"
                },
                {
                    "nombre": "Grado 3 (Moderado)",
                    "descripcion": "Edema pulmonar agudo sin hipotension. Estertores difusos bilaterales. Espuma en via aerea. Requiere ventilacion no invasiva o invasiva"
                },
                {
                    "nombre": "Grado 4 (Grave)",
                    "descripcion": "Edema pulmonar agudo con hipotension arterial. Requiere ventilacion mecanica invasiva y soporte vasoactivo. Internacion en UCI"
                },
                {
                    "nombre": "Grado 5 (Muy grave)",
                    "descripcion": "Paro respiratorio aislado. Pulso presente pero sin esfuerzo ventilatorio. Requiere ventilacion asistida inmediata"
                },
                {
                    "nombre": "Grado 6 (Paro cardiorrespiratorio)",
                    "descripcion": "Paro cardiorrespiratorio. Sin pulso ni respiracion. RCP inmediata. Mortalidad muy elevada. Regla: nadie esta muerto hasta que este caliente y muerto"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Tipo de liquido (agua dulce, salada, clorada, contaminada)",
                "Tiempo estimado de sumersion",
                "Temperatura del agua (fria vs templada)",
                "Posibilidad de trauma cervical asociado (zambullida)",
                "Maniobras de rescate y RCP realizadas en el lugar",
                "Antecedentes de epilepsia, arritmias o consumo de sustancias",
                "Edad de la victima y circunstancias del evento"
            ],
            "examenFisico": [
                "ABCDE sistematico con inmovilizacion cervical si sospecha de trauma",
                "Evaluacion de via aerea y patron respiratorio",
                "Auscultacion pulmonar bilateral (estertores, silencio respiratorio)",
                "Valoracion neurologica con Escala de Glasgow",
                "Temperatura central (rectal o esofagica, NO axilar)",
                "Evaluacion cardiovascular (ritmo, perfusion periferica)",
                "Busqueda de lesiones traumaticas asociadas"
            ],
            "pruebas": [
                {
                    "nombre": "Gasometria arterial",
                    "descripcion": "Evalua grado de hipoxemia, hipercapnia y acidosis metabolica. Es el estudio mas importante para determinar severidad del compromiso respiratorio y guiar la ventilacion mecanica",
                    "valoresReferencia": "PaO2 > 80 mmHg, PaCO2 35-45 mmHg, pH 7.35-7.45, HCO3 22-26 mEq/L, Lactato < 2 mmol/L",
                    "cuidadosEnfermeria": [
                        "Obtener muestra de arteria radial con tecnica aseptica",
                        "Comprimir sitio de puncion por 5 minutos minimo",
                        "Transportar muestra en hielo y procesar en menos de 15 minutos",
                        "Registrar FiO2 y modo ventilatorio al momento de la extraccion"
                    ]
                },
                {
                    "nombre": "Radiografia de torax",
                    "descripcion": "Puede mostrar edema pulmonar difuso bilateral, atelectasias, infiltrados alveolares o neumonia aspirativa. Puede ser normal inicialmente y empeorar en 24-48 horas (ahogamiento secundario)",
                    "valoresReferencia": "Normal: campos pulmonares claros, sin infiltrados, sin derrame pleural",
                    "cuidadosEnfermeria": [
                        "Radiografia portatil si el paciente esta inestable",
                        "Repetir a las 6-12 horas aunque la inicial sea normal",
                        "Correlacionar con clinica y gasometria"
                    ]
                },
                {
                    "nombre": "Electrocardiograma de 12 derivaciones",
                    "descripcion": "Detecta arritmias por hipoxia, hipotermia e hiperpotasemia. Puede mostrar bradicardia sinusal, fibrilacion ventricular, ondas J de Osborn (si hipotermia asociada) o prolongacion del QT",
                    "valoresReferencia": "Ritmo sinusal, FC 60-100 lpm, sin arritmias, QTc < 450 ms",
                    "cuidadosEnfermeria": [
                        "Secar la piel del paciente para buena adherencia de electrodos",
                        "Monitoreo continuo en las primeras 24 horas",
                        "Alertar ante cualquier arritmia nueva"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Restaurar oxigenacion y ventilacion adecuadas",
                "Corregir hipotermia de forma gradual y controlada",
                "Prevenir y tratar el daño cerebral hipoxicoisquemico",
                "Tratar el SDRA y mantener estabilidad hemodinamica",
                "Observacion minima de 24 horas incluso en casos aparentemente leves"
            ],
            "farmacologico": [
                {
                    "nombre": "Oxigeno suplementario / Ventilacion mecanica",
                    "grupo": "Soporte ventilatorio",
                    "mecanismo": "Corrige la hipoxemia causada por el shunt intrapulmonar y las atelectasias. La PEEP (presion positiva al final de la espiracion) recluta alveolos colapsados y mejora la oxigenacion. En casos severos se usa ventilacion protectora con Vt bajo (6 mL/kg)",
                    "dosis": "O2 al 100% inicial, titular segun SpO2 objetivo 94-98%. PEEP inicial 5-10 cmH2O, titular segun oxigenacion. FiO2 la menor posible para SpO2 > 94%",
                    "cuidadosEnfermeria": [
                        "Monitorizar SpO2 continua y gasometria seriada",
                        "Aspirar secreciones y espuma de via aerea",
                        "Posicion semisentada 30° si no hay contraindicacion",
                        "Vigilar signos de barotrauma en ventilacion mecanica",
                        "Registrar parametros ventilatorios cada hora"
                    ]
                },
                {
                    "nombre": "Epinefrina (Adrenalina)",
                    "grupo": "Catecolamina / Vasopresor",
                    "mecanismo": "Agonista alfa y beta adrenergico. En paro cardiorrespiratorio por ahogamiento, aumenta la presion de perfusion coronaria y cerebral, mejora el tono vascular y estimula la contractilidad miocardica. Indicada solo en paro cardiaco",
                    "dosis": "1 mg IV/IO cada 3-5 minutos durante RCP. En niños: 0.01 mg/kg (0.1 mL/kg de solucion 1:10.000). No administrar si temperatura central < 30°C hasta completar recalentamiento",
                    "cuidadosEnfermeria": [
                        "Administrar por via IV o intraosea exclusivamente",
                        "Verificar temperatura central antes de administrar (no dar si < 30°C)",
                        "Monitorizar ritmo cardiaco continuo durante administracion",
                        "Preparar dosis exactas para evitar errores en emergencia"
                    ]
                },
                {
                    "nombre": "Solucion salina normal (ClNa 0.9%) tibia",
                    "grupo": "Cristaloide isotonicopara recalentamiento",
                    "mecanismo": "Expande volemia y contribuye al recalentamiento activo interno cuando se administra a 40-42°C. Corrige la hipovolemia relativa por vasoconstriccion hipotermicay la deshidratacion por inmersion prolongada",
                    "dosis": "Bolos de 250-500 mL IV a 40-42°C. Volumen total segun estado hemodinamico. En niños: 20 mL/kg en bolos",
                    "cuidadosEnfermeria": [
                        "Calentar los fluidos a 40-42°C antes de infundir (usar calentador de fluidos)",
                        "Monitorizar temperatura central durante el recalentamiento",
                        "Objetivo de recalentamiento: 1-2°C por hora",
                        "Vigilar signos de sobrecarga hidrica (estertores, ingurgitacion yugular)",
                        "Control estricto de balance hidrico"
                    ]
                }
            ],
            "noFarmacologico": [
                "Rescate acuatico seguro: prioridad a ventilaciones (5 ventilaciones de rescate antes de compresiones)",
                "RCP con enfasis en ventilacion (a diferencia del protocolo estandar de compresiones primero)",
                "Recalentamiento pasivo: retirar ropa mojada, cubrir con mantas termicas",
                "Recalentamiento activo externo: mantas de aire caliente, compresas calientes en axilas, ingles y cuello",
                "Recalentamiento activo interno en hipotermia severa: lavado gastrico, vesical o peritoneal con solucion tibia",
                "ECMO (oxigenacion por membrana extracorporea) en paro cardiaco refractario con hipotermia severa",
                "Posicion de recuperacion en paciente consciente con ventilacion espontanea",
                "Inmovilizacion cervical si sospecha de lesion por zambullida"
            ],
            "quirurgico": [
                "Toracostomia con tubo si neumotorax por barotrauma o reanimacion",
                "Canulacion para ECMO en centros con disponibilidad (hipotermia severa con paro refractario)",
                "Traqueostomia si ventilacion mecanica prolongada anticipada",
                "Fijacion quirurgica de fracturas cervicales si lesion asociada por zambullida"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluar nivel de conciencia con Escala de Glasgow cada hora",
                "Monitorizar temperatura central (rectal o esofagica, NUNCA axilar en hipotermia)",
                "Auscultacion pulmonar bilateral frecuente (progresion de estertores)",
                "Valorar patron respiratorio y trabajo respiratorio",
                "Evaluar coloracion de piel y llenado capilar",
                "Control de SpO2 continuo y gasometria seriada",
                "Valorar estado emocional y nivel de ansiedad del paciente y familia"
            ],
            "intervenciones": [
                "Mantener via aerea permeable y aspirar secreciones espumosas",
                "Administrar oxigeno humidificado y calentado",
                "Retirar toda la ropa mojada y secar al paciente",
                "Aplicar medidas de recalentamiento segun grado de hipotermia",
                "Manejar al paciente con movimientos suaves (evitar fibrilacion ventricular por estimulo mecanico en hipotermia)",
                "Canalizar dos vias perifericas gruesas",
                "Preparar equipo de intubacion y RCP avanzada",
                "Mantener observacion minima de 24 horas incluso si el paciente parece asintomatico"
            ],
            "educacionPaciente": [
                "Explicar el riesgo de deterioro tardio (ahogamiento secundario en 24-72 horas)",
                "Enseñar a la familia signos de alarma post-alta: tos persistente, dificultad respiratoria, somnolencia",
                "Educar sobre prevencion: cercos en piletas, supervision de niños, no nadar bajo efectos de alcohol",
                "Importancia de aprender RCP basica para la poblacion general",
                "No zambullirse en aguas de profundidad desconocida",
                "Uso de chalecos salvavidas en actividades nauticas"
            ],
            "monitorizacion": [
                "SpO2 continua y gasometria arterial seriada (cada 4-6 horas o segun evolucion)",
                "Temperatura central cada 30 minutos durante recalentamiento activo",
                "Signos vitales cada hora (PA, FC, FR, temperatura)",
                "Diuresis horaria (objetivo > 0.5 mL/kg/h)",
                "Monitoreo cardiaco continuo por 24 horas minimo",
                "Radiografia de torax de control a las 6, 12 y 24 horas",
                "Glasgow cada 2-4 horas en las primeras 24 horas"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00030",
                "nombre": "Deterioro del intercambio de gases",
                "definicion": "Exceso o deficit en la oxigenacion y/o eliminacion de dioxido de carbono en la membrana alveolocapilar",
                "caracteristicasDefinitorias": [
                    "Hipoxemia (PaO2 < 60 mmHg)",
                    "Cianosis central y periferica",
                    "Taquipnea y disnea",
                    "Confusion y agitacion por hipoxia"
                ],
                "factoresRelacionados": [
                    "Inactivacion de surfactante pulmonar por aspiracion de liquido",
                    "Atelectasias difusas",
                    "Edema pulmonar no cardiogenico",
                    "Shunt intrapulmonar"
                ]
            },
            {
                "codigo": "00005",
                "nombre": "Riesgo de desequilibrio de temperatura corporal",
                "definicion": "Vulnerable a una falla en el mantenimiento de la temperatura corporal dentro de rangos normales que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Temperatura central < 35°C",
                    "Escalofrios o ausencia de ellos (hipotermia severa)",
                    "Bradicardia",
                    "Piel fria y palida"
                ],
                "factoresRelacionados": [
                    "Inmersion prolongada en agua fria",
                    "Ropa mojada",
                    "Perdida de mecanismos de termorregulacion",
                    "Exposicion ambiental"
                ]
            },
            {
                "codigo": "00201",
                "nombre": "Riesgo de perfusion tisular cerebral ineficaz",
                "definicion": "Vulnerable a una disminucion de la circulacion tisular cerebral que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Alteracion del nivel de conciencia",
                    "Disminucion del Glasgow",
                    "Convulsiones",
                    "Pupilas fijas y dilatadas en casos severos"
                ],
                "factoresRelacionados": [
                    "Hipoxia cerebral prolongada por sumersion",
                    "Paro cardiorrespiratorio",
                    "Hipotermia severa",
                    "Acidosis metabolica"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "3140",
                "nombre": "Manejo de la via aerea",
                "actividades": [
                    "Aspirar secreciones espumosas de via aerea",
                    "Colocar via aerea orofaringea si esta inconsciente",
                    "Preparar intubacion endotraqueal si Glasgow < 8",
                    "Administrar oxigeno humidificado y calentado",
                    "Monitorizar patron respiratorio y esfuerzo ventilatorio"
                ]
            },
            {
                "codigo": "3900",
                "nombre": "Regulacion de la temperatura",
                "actividades": [
                    "Monitorizar temperatura central cada 30 minutos",
                    "Aplicar medidas de recalentamiento pasivo y activo segun protocolo",
                    "Administrar liquidos intravenosos calentados a 40-42°C",
                    "Evitar maniobras bruscas que desencadenen arritmias",
                    "Documentar curva termica y respuesta al recalentamiento"
                ]
            },
            {
                "codigo": "6200",
                "nombre": "Cuidados en la emergencia",
                "actividades": [
                    "Activar codigo de emergencia y equipo de reanimacion",
                    "Iniciar RCP con enfasis en ventilaciones si aplica",
                    "Establecer acceso vascular rapido (IV o intraoseo)",
                    "Coordinar con UCI para internacion",
                    "Documentar cronologia de eventos y maniobras realizadas"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0402",
                "nombre": "Estado respiratorio: intercambio gaseoso",
                "indicadores": [
                    "PaO2 dentro de rangos normales",
                    "SpO2 > 94% con soporte de oxigeno adecuado",
                    "Ausencia de cianosis",
                    "Patron respiratorio eficaz",
                    "Resolucion progresiva de infiltrados pulmonares"
                ],
                "escala": "1=Desviacion grave, 2=Desviacion sustancial, 3=Desviacion moderada, 4=Desviacion leve, 5=Sin desviacion"
            },
            {
                "codigo": "0800",
                "nombre": "Termorregulacion",
                "indicadores": [
                    "Temperatura central 36-37.5°C",
                    "Ausencia de escalofrios",
                    "Frecuencia cardiaca en rango normal",
                    "Perfusion periferica adecuada"
                ],
                "escala": "1=Gravemente comprometido, 2=Sustancialmente comprometido, 3=Moderadamente comprometido, 4=Levemente comprometido, 5=No comprometido"
            }
        ],
        "complicaciones": [
            "Sindrome de distres respiratorio agudo (SDRA)",
            "Encefalopatia hipoxico-isquemica con daño neurologico permanente",
            "Ahogamiento secundario (deterioro respiratorio 24-72 horas post-evento)",
            "Edema pulmonar no cardiogenico persistente",
            "Fibrilacion ventricular por hipotermia",
            "Neumonia aspirativa por contenido gastrico o agua contaminada",
            "Coagulacion intravascular diseminada (CID)",
            "Insuficiencia renal aguda por rabdomiolisis o hipoperfusion"
        ],
        "criteriosAlarma": [
            "SpO2 < 90% a pesar de oxigeno suplementario",
            "Deterioro del nivel de conciencia (disminucion de Glasgow >= 2 puntos)",
            "Temperatura central < 30°C (hipotermia severa con riesgo de FV)",
            "Paro cardiorrespiratorio",
            "Aparicion de espuma rosada en via aerea (edema pulmonar grave)",
            "Convulsiones",
            "Bradicardia severa < 40 lpm o arritmias malignas"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_hipotermia",
            "pat_sdra",
            "pat_paro_cardiorrespiratorio",
            "pat_tce",
            "pat_lesion_medular"
        ],
        "isPremium": False
    },
    {
        "id": "pat_amputacion_traumatica",
        "nombre": "Amputacion Traumatica",
        "bodySystemId": "traumatologico",
        "definicion": "Perdida parcial o completa de una extremidad o segmento corporal (dedos, mano, antebrazo, pierna) causada por un mecanismo traumatico externo como maquinaria industrial, accidentes de transito, explosiones o heridas por arma cortante. Constituye una emergencia que requiere atencion inmediata tanto del muñon como de la parte amputada para evaluar la posibilidad de reimplantacion microquirurgica.",
        "epidemiologia": "Incidencia estimada de 8-14 por 100.000 habitantes/año. Predomina en varones (relacion 4:1) de 20-50 años. Las causas mas frecuentes son accidentes laborales con maquinaria (40-50%), accidentes de transito (25-30%), explosiones (10%) y agresiones (5-10%). Los dedos de la mano son el segmento mas frecuentemente amputado (70% de los casos). La tasa de reimplantacion exitosa varia del 50-90% segun el mecanismo, nivel de amputacion y tiempo de isquemia.",
        "factoresRiesgo": [
            "Trabajo con maquinaria industrial sin proteccion adecuada",
            "Accidentes de transito (motociclismo, atropellamiento)",
            "Manipulacion de explosivos o pirotecnia",
            "Trabajo en agricultura con maquinaria de corte",
            "Heridas por arma de fuego o arma blanca",
            "Deportes extremos y actividades recreativas de riesgo",
            "Catastrofes naturales y derrumbes",
            "Falta de elementos de proteccion personal en el trabajo"
        ],
        "fisiopatologia": "La amputacion traumatica produce seccion de todas las estructuras anatomicas del segmento afectado: piel, musculo, tendones, nervios, vasos sanguineos y hueso. La hemorragia puede ser masiva y potencialmente mortal, especialmente en amputaciones proximales (por encima de la rodilla o codo). La vasoconstriccion refleja y la retraccion de los vasos ayudan parcialmente a controlar el sangrado. El segmento amputado sufre isquemia progresiva: el musculo tolera 6 horas de isquemia caliente (a temperatura ambiente) y hasta 12 horas de isquemia fria (preservado en hielo). Los nervios y tendones son mas resistentes (hasta 24 horas en frio). La lesion por aplastamiento (crush) produce mayor daño tisular que el corte limpio, con edema masivo, rabdomiolisis y menor probabilidad de reimplantacion exitosa. La respuesta inflamatoria sistemica puede desencadenar coagulopatia por consumo y sindrome de respuesta inflamatoria sistemica (SRIS) en amputaciones mayores.",
        "signosYSintomas": {
            "signos": [
                "Separacion parcial o completa del segmento corporal",
                "Hemorragia activa que puede ser arterial (pulsatil, roja brillante) o venosa",
                "Exposicion de estructuras profundas (hueso, tendones, vasos)",
                "Palidez y frialdad distal al sitio de lesion en amputacion incompleta",
                "Shock hipovolemico en amputaciones mayores (taquicardia, hipotension, palidez)",
                "Contaminacion de la herida con cuerpos extraños",
                "Ausencia de pulsos distales en amputacion incompleta",
                "Deformidad evidente del miembro afectado"
            ],
            "sintomas": [
                "Dolor intenso en el sitio de amputacion",
                "Sensacion de miembro fantasma (percepcion del segmento amputado)",
                "Mareos y lipotimia por perdida sanguinea",
                "Ansiedad extrema y panico",
                "Nauseas y vomitos por dolor y shock",
                "Parestesias en zona proximal a la lesion"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion de amputaciones traumaticas",
            "tipos": [
                {
                    "nombre": "Amputacion completa",
                    "descripcion": "Separacion total del segmento sin conexion de tejidos blandos. Mayor posibilidad de reimplantacion si el corte es limpio y el tiempo de isquemia es corto"
                },
                {
                    "nombre": "Amputacion incompleta (subtotal)",
                    "descripcion": "Mantenimiento de un puente de tejido blando < 25% de la circunferencia. Puede conservar flujo vascular parcial. Revascularizacion urgente"
                },
                {
                    "nombre": "Amputacion por corte limpio (guillotina)",
                    "descripcion": "Bordes netos, minima contusion tisular. Mayor probabilidad de reimplantacion exitosa (hasta 90%)"
                },
                {
                    "nombre": "Amputacion por aplastamiento (crush)",
                    "descripcion": "Daño tisular extenso, bordes irregulares, lesion vascular intimal. Menor probabilidad de reimplantacion. Mayor riesgo de infeccion"
                },
                {
                    "nombre": "Amputacion por avulsion",
                    "descripcion": "Arrancamiento del segmento con traccion. Daño vascular y nervioso extenso en longitud. Peor pronostico para reimplantacion"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Mecanismo exacto de la lesion (corte, aplastamiento, avulsion, explosion)",
                "Tiempo transcurrido desde la amputacion",
                "Condiciones de preservacion de la parte amputada",
                "Mano dominante del paciente (relevante para decision de reimplante)",
                "Ocupacion y actividades habituales del paciente",
                "Antecedentes de tabaquismo, diabetes o enfermedad vascular",
                "Medicacion actual (anticoagulantes, antiplaquetarios)",
                "Estado de vacunacion antitetanica"
            ],
            "examenFisico": [
                "Evaluacion primaria ABCDE (priorizar control de hemorragia)",
                "Clasificacion del tipo de amputacion (completa vs incompleta, limpia vs crush)",
                "Valoracion del muñon: nivel, viabilidad de tejidos, contaminacion",
                "Evaluacion neurovascular proximal a la lesion",
                "Inspeccion de la parte amputada: integridad, contaminacion, temperatura",
                "Busqueda de lesiones asociadas (fracturas, lesiones vasculares a distancia)",
                "Evaluacion del estado hemodinamico global"
            ],
            "pruebas": [
                {
                    "nombre": "Radiografia del muñon y de la parte amputada",
                    "descripcion": "Define nivel oseo de la amputacion, detecta cuerpos extraños metalicos, evalua fracturas asociadas y planifica abordaje quirurgico. Se realiza tanto al muñon como al segmento amputado",
                    "valoresReferencia": "Evaluar nivel de seccion osea, presencia de fragmentos, cuerpos extraños y estado articular",
                    "cuidadosEnfermeria": [
                        "No retirar apositos compresivos para la radiografia",
                        "Enviar la parte amputada junto con el paciente",
                        "Mantener la parte amputada preservada durante el estudio",
                        "Priorizar estabilizacion hemodinamica sobre estudios de imagen"
                    ]
                },
                {
                    "nombre": "Laboratorio de urgencia (hemograma, coagulacion, grupo y factor, CPK)",
                    "descripcion": "Hemograma para evaluar perdida sanguinea, coagulograma para descartar coagulopatia, grupo y factor para preparar hemoderivados, CPK para detectar rabdomiolisis por aplastamiento",
                    "valoresReferencia": "Hb > 7 g/dL para reimplante, Plaquetas > 100.000, TP e INR normales, CPK < 1000 U/L",
                    "cuidadosEnfermeria": [
                        "Extraer muestras junto con canalizacion de via periferica",
                        "Solicitar grupo y factor de forma urgente",
                        "Reservar minimo 2 unidades de globulos rojos",
                        "Repetir CPK a las 6 y 12 horas si mecanismo de aplastamiento"
                    ]
                },
                {
                    "nombre": "Angiografia o angiotomografia del miembro",
                    "descripcion": "Evalua estado vascular proximal y distal, identifica vasos disponibles para anastomosis microquirurgica. Indicada en amputaciones incompletas o cuando se planifica reimplantacion",
                    "valoresReferencia": "Permeabilidad de arterias y venas principales del miembro afectado",
                    "cuidadosEnfermeria": [
                        "Verificar funcion renal antes del contraste (creatinina)",
                        "Canalizar via gruesa para inyeccion de contraste",
                        "Hidratar previamente si la funcion renal lo permite",
                        "No retrasar la cirugia por este estudio si la indicacion quirurgica es clara"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Control inmediato de la hemorragia",
                "Preservacion adecuada de la parte amputada para posible reimplantacion",
                "Estabilizacion hemodinamica del paciente",
                "Reimplantacion microquirurgica cuando este indicada y sea viable",
                "Prevencion de infeccion y promocion de cicatrizacion del muñon",
                "Rehabilitacion funcional y adaptacion a protesis si reimplante no es viable"
            ],
            "farmacologico": [
                {
                    "nombre": "Antibioticoterapia profilactica (Ampicilina-Sulbactam o Cefalotina + Metronidazol)",
                    "grupo": "Antibioticos de amplio espectro",
                    "mecanismo": "Cobertura de flora cutanea (cocos gram positivos), bacilos gram negativos y anaerobios. Prevencion de infeccion de herida traumatica contaminada y gangrena gaseosa",
                    "dosis": "Ampicilina-Sulbactam 1.5-3 g IV cada 6-8 horas. Alternativa: Cefalotina 1 g IV cada 6 h + Metronidazol 500 mg IV cada 8 h. Duracion: 48-72 horas, prolongar si contaminacion severa",
                    "cuidadosEnfermeria": [
                        "Administrar primera dosis lo antes posible (idealmente en la primera hora)",
                        "Verificar alergias a betalactamicos antes de administrar",
                        "Monitorizar signos de reaccion alergica durante la infusion",
                        "Ajustar dosis segun funcion renal",
                        "Registrar hora exacta de administracion"
                    ]
                },
                {
                    "nombre": "Toxoide tetanico e inmunoglobulina antitetanica",
                    "grupo": "Inmunizacion activa y pasiva",
                    "mecanismo": "El toxoide estimula la produccion de anticuerpos contra la toxina de Clostridium tetani. La inmunoglobulina proporciona inmunidad pasiva inmediata. Indicado en toda herida traumatica contaminada",
                    "dosis": "Toxoide tetanico 0.5 mL IM (refuerzo si ultima dosis > 5 años). Inmunoglobulina antitetanica 250-500 UI IM si esquema incompleto o desconocido",
                    "cuidadosEnfermeria": [
                        "Verificar estado de vacunacion del paciente",
                        "Administrar toxoide e inmunoglobulina en sitios anatomicos diferentes",
                        "Registrar lote y fecha de administracion",
                        "Informar al paciente sobre efectos locales esperados"
                    ]
                },
                {
                    "nombre": "Analgesia multimodal (Tramadol + Ketorolac o Morfina en dolor severo)",
                    "grupo": "Analgesicos opioides y no opioides",
                    "mecanismo": "Tramadol: agonista mu debil e inhibidor de recaptacion de serotonina y noradrenalina. Ketorolac: AINE con potente efecto analgesico. Morfina: agonista mu puro para dolor severo. El enfoque multimodal reduce la necesidad de opioides y mejora el control del dolor",
                    "dosis": "Tramadol 50-100 mg IV cada 6-8 h. Ketorolac 30 mg IV cada 8 h (maximo 5 dias). Morfina 2-5 mg IV cada 4 h si dolor severo (EVA > 7). Titular segun respuesta",
                    "cuidadosEnfermeria": [
                        "Evaluar dolor con escala EVA antes y despues de cada dosis",
                        "Monitorizar frecuencia respiratoria con opioides (alerta si FR < 12)",
                        "Vigilar sedacion excesiva y nauseas",
                        "No administrar ketorolac si coagulopatia o sangrado activo",
                        "Ofrecer analgesia preventiva antes de curaciones"
                    ]
                }
            ],
            "noFarmacologico": [
                "Control de hemorragia: presion directa con aposito compresivo; torniquete solo si hemorragia no controlable",
                "Preservacion de parte amputada: envolver en gasa humedecida con solucion fisiologica, colocar en bolsa sellada, depositar sobre hielo (NUNCA contacto directo del tejido con hielo)",
                "Elevacion del muñon por encima del nivel del corazon",
                "Irrigacion copiosa de la herida con solucion fisiologica",
                "Inmovilizacion del muñon con ferula acolchada",
                "Apoyo psicologico inmediato y acompañamiento emocional",
                "Rehabilitacion temprana y adaptacion funcional"
            ],
            "quirurgico": [
                "Reimplantacion microquirurgica: anastomosis arterial, venosa, reparacion de tendones y nervios (indicada si < 6 h de isquemia caliente o < 12 h de isquemia fria, corte limpio, paciente estable)",
                "Regularizacion del muñon: desbridamiento de tejido no viable, cobertura osea adecuada, cierre primario o colgajo",
                "Fasciotomia profilactica post-reimplante para prevenir sindrome compartimental",
                "Injerto de nervio si defecto nervioso > 3 cm",
                "Colgajos de cobertura si imposibilidad de cierre primario del muñon"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Evaluacion hemodinamica: PA, FC, llenado capilar, nivel de conciencia",
                "Valoracion del muñon: sangrado, coloracion, temperatura, edema",
                "Estado neurovascular distal en amputaciones incompletas (pulsos, sensibilidad, movilidad)",
                "Valoracion del dolor con escala EVA cada 2 horas",
                "Evaluacion del estado emocional: ansiedad, duelo, negacion",
                "Estado de la parte amputada: preservacion adecuada, temperatura, tiempo de isquemia",
                "Control de perdidas sanguineas (apositos, drenajes)"
            ],
            "intervenciones": [
                "Control de hemorragia con compresion directa y vendaje compresivo",
                "Preservar la parte amputada segun protocolo (gasa humeda, bolsa sellada, hielo indirecto)",
                "Elevar el muñon y mantener inmovilizado",
                "Cuidado de herida con tecnica aseptica estricta",
                "Post-reimplante: monitorizar perfusion del segmento reimplantado cada hora (color, temperatura, llenado capilar, pulso con Doppler)",
                "Vendaje de muñon en forma de espiga para modelado (preparacion para protesis)",
                "Facilitar acompañamiento psicologico y de salud mental",
                "Coordinar con equipo de rehabilitacion desde el ingreso"
            ],
            "educacionPaciente": [
                "Explicar el proceso de cicatrizacion y tiempos esperados de recuperacion",
                "Enseñar cuidados del muñon: higiene, vendaje, inspeccion diaria",
                "Informar sobre dolor de miembro fantasma: es real, es frecuente y tiene tratamiento",
                "Orientar sobre opciones protesicas y proceso de rehabilitacion",
                "Enseñar ejercicios de rango de movimiento y fortalecimiento del muñon",
                "Derivar a grupos de apoyo y salud mental",
                "Educar sobre prevencion de accidentes laborales y uso de proteccion"
            ],
            "monitorizacion": [
                "Signos vitales cada 15 minutos durante estabilizacion inicial, luego cada hora",
                "Control de hemoglobina seriada cada 6-8 horas en las primeras 24 horas",
                "Post-reimplante: evaluacion del segmento reimplantado cada hora por 72 horas (color, temperatura, llenado capilar, Doppler)",
                "Balance hidrico estricto",
                "Temperatura corporal cada 4 horas (detectar infeccion temprana)",
                "EVA de dolor cada 2-4 horas"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00046",
                "nombre": "Deterioro de la integridad cutanea",
                "definicion": "Alteracion de la epidermis y/o dermis causada por agente traumatico externo con perdida de segmento corporal",
                "caracteristicasDefinitorias": [
                    "Destruccion de capas de la piel y tejidos profundos",
                    "Exposicion de estructuras anatomicas (hueso, tendones)",
                    "Herida abierta con bordes irregulares o netos",
                    "Sangrado activo"
                ],
                "factoresRelacionados": [
                    "Trauma mecanico directo",
                    "Fuerza de aplastamiento o cizallamiento",
                    "Avulsion tisular"
                ]
            },
            {
                "codigo": "00206",
                "nombre": "Riesgo de sangrado",
                "definicion": "Vulnerable a una disminucion del volumen de sangre que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Hemorragia activa por muñon",
                    "Taquicardia compensadora",
                    "Hipotension arterial",
                    "Palidez y frialdad periferica"
                ],
                "factoresRelacionados": [
                    "Seccion de vasos sanguineos mayores",
                    "Coagulopatia por consumo",
                    "Trauma tisular extenso"
                ]
            },
            {
                "codigo": "00118",
                "nombre": "Trastorno de la imagen corporal",
                "definicion": "Confusion en la imagen mental del yo fisico del individuo tras la perdida de un segmento corporal",
                "caracteristicasDefinitorias": [
                    "Expresiones de sentimientos negativos sobre el cuerpo",
                    "Temor al rechazo social",
                    "No mirar la parte afectada",
                    "Preocupacion por la perdida funcional"
                ],
                "factoresRelacionados": [
                    "Perdida traumatica de extremidad o segmento",
                    "Cambio en la funcionalidad",
                    "Alteracion de la autoimagen"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "4030",
                "nombre": "Administracion de hemoderivados",
                "actividades": [
                    "Verificar grupo y factor del paciente y compatibilidad",
                    "Controlar signos vitales antes, durante y despues de la transfusion",
                    "Vigilar signos de reaccion transfusional (fiebre, urticaria, disnea)",
                    "Administrar a velocidad adecuada segun indicacion",
                    "Registrar volumen transfundido y respuesta del paciente"
                ]
            },
            {
                "codigo": "3660",
                "nombre": "Cuidado de heridas",
                "actividades": [
                    "Realizar curaciones con tecnica aseptica estricta",
                    "Evaluar caracteristicas de la herida: color, olor, exudado, bordes",
                    "Irrigar con solucion fisiologica abundante",
                    "Aplicar vendaje adecuado al tipo de herida y fase de cicatrizacion",
                    "Documentar evolucion de la herida con mediciones y fotografias"
                ]
            },
            {
                "codigo": "5270",
                "nombre": "Apoyo emocional",
                "actividades": [
                    "Proporcionar ambiente seguro para expresion de sentimientos",
                    "Escuchar activamente y validar emociones del paciente",
                    "Facilitar el proceso de duelo por la perdida corporal",
                    "Derivar a profesional de salud mental si requiere",
                    "Incluir a la familia en el proceso de apoyo emocional"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "1101",
                "nombre": "Integridad tisular: piel y membranas mucosas",
                "indicadores": [
                    "Cicatrizacion del muñon en tiempo esperado",
                    "Ausencia de signos de infeccion",
                    "Perfusion tisular adecuada del muñon",
                    "Cierre progresivo de la herida"
                ],
                "escala": "1=Gravemente comprometido, 2=Sustancialmente comprometido, 3=Moderadamente comprometido, 4=Levemente comprometido, 5=No comprometido"
            },
            {
                "codigo": "1200",
                "nombre": "Imagen corporal",
                "indicadores": [
                    "Aceptacion progresiva del cambio corporal",
                    "Disposicion a mirar y tocar el muñon",
                    "Participacion activa en el cuidado del muñon",
                    "Adaptacion a dispositivos protesicos"
                ],
                "escala": "1=Nunca positivo, 2=Raramente positivo, 3=A veces positivo, 4=Frecuentemente positivo, 5=Siempre positivo"
            }
        ],
        "complicaciones": [
            "Shock hipovolemico por hemorragia masiva",
            "Infeccion del muñon (celulitis, osteomielitis, gangrena gaseosa)",
            "Dolor de miembro fantasma (presente en 50-80% de los amputados)",
            "Fracaso de reimplantacion (trombosis vascular, necrosis del segmento)",
            "Sindrome compartimental post-reimplante",
            "Contractura en flexion del muñon",
            "Neuroma doloroso en el muñon",
            "Sindrome de estres postraumatico (TEPT)"
        ],
        "criteriosAlarma": [
            "Hemorragia activa no controlable con presion directa",
            "Signos de shock hipovolemico (FC > 120, PAS < 90, alteracion de conciencia)",
            "Parte amputada con tiempo de isquemia caliente > 6 horas",
            "Post-reimplante: palidez, frialdad o cianosis del segmento reimplantado",
            "Fiebre > 38.5°C con signos de infeccion local (secrecion purulenta, crepitacion)",
            "Dolor progresivo e intenso en muñon no aliviado con analgesia (sospecha de sindrome compartimental)",
            "Mioglobinuria (orina oscura) sugiriendo rabdomiolisis"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_shock_hipovolemico",
            "pat_politraumatismo",
            "pat_fracturas",
            "pat_sindrome_compartimental"
        ],
        "isPremium": False
    },
    {
        "id": "pat_hipotermia",
        "nombre": "Hipotermia",
        "bodySystemId": "traumatologico",
        "definicion": "Disminucion de la temperatura corporal central por debajo de 35°C, causada por exposicion ambiental prolongada al frio, inmersion en agua fria, o condiciones medicas predisponentes. La hipotermia afecta progresivamente todos los sistemas organicos, con especial impacto en el sistema cardiovascular y neurologico. Es una emergencia potencialmente mortal que requiere recalentamiento controlado y soporte vital avanzado.",
        "epidemiologia": "Causa aproximadamente 1.500 muertes anuales en Estados Unidos y cifras similares en Europa. Incidencia mayor en climas frios, pero puede ocurrir en cualquier latitud (incluso en ambientes templados en personas vulnerables). Poblacion de riesgo: personas en situacion de calle (40% de los casos), adultos mayores, recien nacidos y deportistas de montaña. Mortalidad del 12-33% en hipotermia moderada y del 40-80% en hipotermia severa. En Argentina, los casos se concentran en Patagonia y zonas cordilleranas en invierno.",
        "factoresRiesgo": [
            "Exposicion prolongada al frio ambiental sin proteccion adecuada",
            "Inmersion en agua fria (ahogamiento, naufragio)",
            "Edad extrema (recien nacidos y adultos mayores > 65 años)",
            "Consumo de alcohol (vasodilatacion periferica, alteracion de termorregulacion, conducta de riesgo)",
            "Personas en situacion de calle",
            "Hipotiroidismo e insuficiencia suprarrenal",
            "Desnutricion y caquexia",
            "Uso de drogas sedantes, neurolepticos u opioides",
            "Trauma mayor con shock y perdida sanguinea",
            "Lesion medular (perdida de termorregulacion autonomica)"
        ],
        "fisiopatologia": "La temperatura corporal se mantiene normalmente entre 36.5-37.5°C mediante el equilibrio entre produccion (metabolismo, escalofrios, ejercicio) y perdida de calor (radiacion, conduccion, conveccion, evaporacion). Cuando la perdida supera la produccion, la temperatura central desciende. En la fase inicial (35-32°C), el organismo activa mecanismos compensadores: escalofrios intensos, vasoconstriccion periferica, taquicardia y aumento del metabolismo. Por debajo de 32°C los escalofrios cesan, el metabolismo basal cae un 6-7% por cada grado, y la frecuencia cardiaca disminuye progresivamente. La conduccion cardiaca se enlentece, apareciendo las caracteristicas ondas J de Osborn en el ECG (deflexion positiva en la union del QRS con el segmento ST). Por debajo de 28°C el miocardio se vuelve extremadamente irritable, con alto riesgo de fibrilacion ventricular espontanea o desencadenada por estimulos minimos (movimientos bruscos, manipulacion del paciente, canalizacion de via central). La actividad enzimatica se reduce, prolongando la vida media de los farmacos. El flujo sanguineo cerebral disminuye un 6-7% por grado, lo que paradojicamente confiere cierta neuroproteccion (reduccion del consumo de oxigeno cerebral). Esta es la base de la regla: nadie esta muerto hasta que este caliente y muerto.",
        "signosYSintomas": {
            "signos": [
                "Temperatura central < 35°C (medida rectal o esofagica)",
                "Escalofrios intensos (presentes en hipotermia leve, ausentes en severa)",
                "Bradicardia progresiva (puede llegar a < 30 lpm)",
                "Ondas J de Osborn en electrocardiograma",
                "Piel fria, palida y cianotica",
                "Rigidez muscular generalizada (simula rigor mortis)",
                "Hipotension arterial progresiva",
                "Respiracion superficial y lenta (bradipnea)",
                "Pupilas dilatadas y poco reactivas en hipotermia severa",
                "Arreflexia en casos severos"
            ],
            "sintomas": [
                "Sensacion intensa de frio y malestar general",
                "Confusion progresiva y desorientacion",
                "Habla arrastrada y dificultad para articular",
                "Somnolencia progresiva que evoluciona a coma",
                "Torpeza y falta de coordinacion motora",
                "Comportamiento paradojico: desvestimiento paradojico (el paciente se quita la ropa)"
            ]
        },
        "clasificacion": {
            "nombre": "Clasificacion de hipotermia segun temperatura central",
            "tipos": [
                {
                    "nombre": "Hipotermia leve (Grado I)",
                    "descripcion": "Temperatura central 32-35°C. Paciente consciente con escalofrios. Taquicardia, taquipnea, vasoconstriccion. Confuso pero cooperador. Tratamiento: recalentamiento pasivo"
                },
                {
                    "nombre": "Hipotermia moderada (Grado II)",
                    "descripcion": "Temperatura central 28-32°C. Escalofrios ausentes. Bradicardia progresiva. Ondas J de Osborn en ECG. Alteracion de conciencia (estupor). Riesgo de arritmias. Tratamiento: recalentamiento activo externo"
                },
                {
                    "nombre": "Hipotermia severa (Grado III)",
                    "descripcion": "Temperatura central < 28°C. Coma. Rigidez muscular. Alto riesgo de fibrilacion ventricular espontanea. Pupilas pueden estar fijas y dilatadas (NO indica muerte cerebral). Tratamiento: recalentamiento activo interno. ECMO si disponible"
                },
                {
                    "nombre": "Hipotermia profunda / Paro cardiaco (Grado IV)",
                    "descripcion": "Temperatura central < 24°C o paro cardiaco. Ausencia de signos vitales. RCP prolongada hasta recalentamiento. Nadie esta muerto hasta que este caliente y muerto. ECMO es el tratamiento de eleccion"
                }
            ]
        },
        "diagnostico": {
            "anamnesis": [
                "Tiempo y condiciones de exposicion al frio",
                "Tipo de exposicion: ambiental vs inmersion en agua",
                "Temperatura ambiental y condiciones climaticas",
                "Consumo de alcohol u otras sustancias",
                "Antecedentes de hipotiroidismo, insuficiencia suprarrenal o diabetes",
                "Medicacion habitual (betabloqueantes, sedantes, neurolepticos)",
                "Posibilidad de trauma asociado",
                "Actividades realizadas antes de la exposicion (montañismo, naufragio)"
            ],
            "examenFisico": [
                "Medicion de temperatura central con termometro de baja lectura (rectal o esofagico, NUNCA axilar)",
                "Evaluacion del nivel de conciencia y Glasgow",
                "Frecuencia cardiaca y ritmo (bradicardia esperada, buscar arritmias)",
                "Patron respiratorio (bradipnea esperada)",
                "Evaluacion de piel: color, temperatura, llenado capilar",
                "Presencia o ausencia de escalofrios (indicador de severidad)",
                "Busqueda de congelacion localizada en extremidades, nariz y orejas",
                "Evaluacion de rigidez muscular"
            ],
            "pruebas": [
                {
                    "nombre": "Electrocardiograma de 12 derivaciones",
                    "descripcion": "Fundamental para detectar ondas J de Osborn (patognomonicas de hipotermia), bradicardia sinusal, prolongacion de intervalos PR, QRS y QT, fibrilacion auricular y riesgo de fibrilacion ventricular. Las ondas J son proporcionales al grado de hipotermia",
                    "valoresReferencia": "Normal: ritmo sinusal 60-100 lpm. En hipotermia: bradicardia sinusal, ondas J de Osborn, intervalos prolongados. FV < 28°C",
                    "cuidadosEnfermeria": [
                        "Secar bien la piel antes de colocar electrodos",
                        "Monitoreo cardiaco continuo obligatorio",
                        "No realizar maniobras bruscas durante la colocacion (riesgo de FV)",
                        "Alertar ante cambios de ritmo subitos"
                    ]
                },
                {
                    "nombre": "Gasometria arterial con correccion por temperatura",
                    "descripcion": "Evalua acidosis metabolica y respiratoria. Los valores de pH y gases varian con la temperatura: se debe solicitar correccion por temperatura del paciente o interpretar con metodo alfa-stat (sin corregir). La acidosis metabolica con lactato elevado indica hipoperfusion tisular",
                    "valoresReferencia": "pH corregido 7.35-7.45, PaO2 > 60 mmHg, PaCO2 35-45 mmHg, Lactato < 2 mmol/L (elevado indica mal pronostico)",
                    "cuidadosEnfermeria": [
                        "Solicitar correccion por temperatura al laboratorio",
                        "Puncion arterial con cuidado de no estimular arritmias",
                        "Registrar temperatura central al momento de la extraccion",
                        "Seriada cada 2-4 horas durante recalentamiento"
                    ]
                },
                {
                    "nombre": "Laboratorio completo (hemograma, electrolitos, coagulacion, glucemia, CPK, amilasa)",
                    "descripcion": "La hipotermia causa hemoconcentracion, hiperpotasemia (predictor de mortalidad si K > 12 mEq/L), coagulopatia (el coagulograma puede ser normal in vitro porque se procesa a 37°C, pero in vivo hay coagulopatia), hipoglucemia o hiperglucemia, elevacion de CPK por rabdomiolisis y amilasa por pancreatitis",
                    "valoresReferencia": "K < 5.5 mEq/L (K > 12 = criterio de irreversibilidad), Glucemia 80-180 mg/dL, INR < 1.5, CPK < 1000 U/L",
                    "cuidadosEnfermeria": [
                        "Extraer muestras sin torniquete prolongado (falsa hiperpotasemia)",
                        "Solicitar potasio de urgencia (predictor pronostico clave)",
                        "Monitorizar glucemia capilar cada 2 horas",
                        "Repetir laboratorio cada 4-6 horas durante recalentamiento"
                    ]
                }
            ]
        },
        "tratamientoMedico": {
            "objetivos": [
                "Recalentar al paciente de forma gradual y controlada (1-2°C por hora)",
                "Prevenir y tratar arritmias cardiacas (especialmente FV)",
                "Corregir alteraciones metabolicas (acidosis, hiperpotasemia, hipoglucemia)",
                "Mantener estabilidad hemodinamica durante el recalentamiento",
                "Manejar al paciente con extrema delicadeza para evitar desencadenar FV"
            ],
            "farmacologico": [
                {
                    "nombre": "Solucion salina normal tibia (ClNa 0.9% a 40-42°C)",
                    "grupo": "Cristaloide isotonico para recalentamiento interno",
                    "mecanismo": "Contribuye al recalentamiento activo interno al aportar calor directamente al compartimiento intravascular. Corrige la hipovolemia por vasodilatacion durante el recalentamiento (shock por recalentamiento). Los liquidos frios empeoran la hipotermia",
                    "dosis": "Bolos de 250-500 mL a 40-42°C. Volumen total segun respuesta hemodinamica. En niños: 20 mL/kg en bolos. Usar calentador de fluidos en linea",
                    "cuidadosEnfermeria": [
                        "SIEMPRE calentar los fluidos antes de administrar (40-42°C)",
                        "Usar calentador de fluidos en linea si disponible",
                        "Monitorizar temperatura central cada 30 minutos",
                        "Vigilar signos de sobrecarga hidrica durante recalentamiento",
                        "No administrar Ringer lactato (el higado hipotermico no metaboliza el lactato)"
                    ]
                },
                {
                    "nombre": "Epinefrina (en paro cardiaco por hipotermia)",
                    "grupo": "Catecolamina / Vasopresor",
                    "mecanismo": "Agonista adrenergico alfa y beta. En hipotermia severa, la respuesta a catecolaminas esta disminuida y el riesgo de arritmias aumenta. Se limita su uso: NO administrar si la temperatura central es < 30°C. Entre 30-35°C, espaciar las dosis al doble del intervalo habitual. Solo usar cuando la temperatura supere los 30°C",
                    "dosis": "1 mg IV cada 3-5 min en RCP estandar. Si temperatura < 30°C: NO administrar hasta recalentamiento. Si 30-35°C: espaciar a 1 mg cada 6-10 min. Retomar dosis normales cuando temperatura > 35°C",
                    "cuidadosEnfermeria": [
                        "Verificar temperatura central ANTES de cada dosis",
                        "NO administrar si temperatura < 30°C (corazon no responde y acumula farmacos)",
                        "Espaciar dosis al doble si temperatura 30-35°C",
                        "Monitorizar ritmo cardiaco continuo",
                        "Registrar cada dosis con temperatura central correspondiente"
                    ]
                },
                {
                    "nombre": "Dextrosa al 50% (si hipoglucemia)",
                    "grupo": "Suplemento de glucosa",
                    "mecanismo": "Corrige la hipoglucemia que ocurre por agotamiento de las reservas de glucogeno hepatico tras escalofrios prolongados. El cerebro hipotermico es especialmente vulnerable a la hipoglucemia. Tambien puede haber hiperglucemia por resistencia a la insulina inducida por hipotermia",
                    "dosis": "25-50 mL de Dextrosa al 50% IV (equivale a 12.5-25 g de glucosa). En niños: Dextrosa al 10%, 2-4 mL/kg. Titular segun glucemia capilar",
                    "cuidadosEnfermeria": [
                        "Verificar glucemia capilar antes de administrar",
                        "Administrar por via central o vena gruesa (la Dextrosa 50% es hipertonica e irritante)",
                        "Monitorizar glucemia cada 30 minutos tras la administracion",
                        "No corregir hiperglucemia leve con insulina (la insulina es ineficaz en hipotermia)"
                    ]
                }
            ],
            "noFarmacologico": [
                "Recalentamiento pasivo (hipotermia leve): retirar ropa mojada, cubrir con mantas secas, ambiente calido, bebidas calientes si consciente",
                "Recalentamiento activo externo (hipotermia moderada): mantas de aire caliente forzado (Bair Hugger), compresas calientes en axilas, ingles y cuello (zonas de grandes vasos)",
                "Recalentamiento activo interno (hipotermia severa): liquidos IV tibios, lavado vesical, gastrico o peritoneal con solucion a 40-42°C",
                "ECMO o bypass cardiopulmonar (hipotermia severa con paro cardiaco): recalentamiento mas rapido y efectivo, permite soporte circulatorio simultaneo",
                "Manipulacion extremadamente cuidadosa del paciente (movimientos minimos y suaves para evitar desencadenar FV)",
                "NO desfibrilar si temperatura < 30°C (miocardio refractario); intentar un maximo de 3 descargas, si no responde esperar a recalentar > 30°C",
                "RCP prolongada: continuar hasta que el paciente este caliente (> 32°C) o hasta que se determine irreversibilidad (K > 12 mEq/L)"
            ],
            "quirurgico": [
                "Canulacion para ECMO venoarterial en hipotermia severa con paro cardiaco refractario",
                "Lavado peritoneal con solucion tibia a 40-42°C a traves de cateteres intraperitoneales",
                "Lavado pleural bilateral con solucion tibia (alternativa si no hay ECMO)",
                "Toracostomia si neumotorax por RCP prolongada o barotrauma"
            ]
        },
        "cuidadosEnfermeria": {
            "valoracion": [
                "Medicion de temperatura central con termometro de baja lectura (rectal o esofagico, NUNCA axilar ni oral)",
                "Evaluacion del nivel de conciencia y Glasgow (la respuesta pupilar puede estar abolida sin indicar muerte cerebral)",
                "Monitoreo cardiaco continuo (buscar ondas J, bradicardia, arritmias)",
                "Evaluacion de escalofrios (su ausencia indica hipotermia moderada-severa)",
                "Valoracion de piel: color, temperatura, presencia de congelacion localizada",
                "Estado hemodinamico: PA, FC (puede requerir palpacion prolongada para detectar pulso lento)",
                "Evaluacion de rigidez muscular (no confundir con rigor mortis)"
            ],
            "intervenciones": [
                "Retirar toda la ropa mojada con tijera (minimizar movimientos)",
                "Aplicar recalentamiento segun grado de hipotermia (pasivo, activo externo, activo interno)",
                "Manejar al paciente horizontalmente y con movimientos MINIMOS (prevenir FV)",
                "NO frotar ni masajear la piel (riesgo de FV y daño tisular)",
                "Administrar liquidos IV calentados a 40-42°C exclusivamente",
                "Mantener monitoreo cardiaco continuo con alarmas activadas",
                "Preparar equipo de desfibrilacion y RCP avanzada",
                "Si paro cardiaco: RCP continua hasta recalentamiento > 32°C o criterio de irreversibilidad"
            ],
            "educacionPaciente": [
                "Explicar que la recuperacion puede ser completa incluso tras hipotermia severa",
                "Enseñar medidas de prevencion: vestimenta adecuada en capas, proteccion de extremidades",
                "Educar sobre signos tempranos de hipotermia: escalofrios, confusion, torpeza",
                "Importancia de no consumir alcohol antes de exposicion al frio",
                "Enseñar primeros auxilios basicos: retirar ropa mojada, abrigar, buscar refugio",
                "Informar sobre poblaciones vulnerables: adultos mayores, niños, personas con enfermedades cronicas"
            ],
            "monitorizacion": [
                "Temperatura central cada 30 minutos durante recalentamiento activo",
                "ECG continuo con alarma para arritmias (especialmente FV y bradicardia severa)",
                "Signos vitales cada 15-30 minutos durante fase critica",
                "Glucemia capilar cada 2 horas",
                "Potasio serico cada 2-4 horas (predictor pronostico clave)",
                "Gasometria arterial seriada con correccion por temperatura",
                "Diuresis horaria (objetivo > 0.5 mL/kg/h)"
            ]
        },
        "npiNanda": [
            {
                "codigo": "00006",
                "nombre": "Hipotermia",
                "definicion": "Temperatura corporal central por debajo de los rangos normales diurnos debido a fallo de la termorregulacion",
                "caracteristicasDefinitorias": [
                    "Temperatura central < 35°C",
                    "Escalofrios (leve) o ausencia de escalofrios (severa)",
                    "Piel fria al tacto",
                    "Cianosis en lechos ungueales",
                    "Bradicardia"
                ],
                "factoresRelacionados": [
                    "Exposicion prolongada a ambiente frio",
                    "Inmersion en agua fria",
                    "Ropa mojada o inadecuada",
                    "Consumo de alcohol",
                    "Edad extrema",
                    "Enfermedades endocrinas"
                ]
            },
            {
                "codigo": "00029",
                "nombre": "Disminucion del gasto cardiaco",
                "definicion": "Cantidad de sangre bombeada por el corazon insuficiente para satisfacer las demandas metabolicas del organismo",
                "caracteristicasDefinitorias": [
                    "Bradicardia progresiva",
                    "Hipotension arterial",
                    "Llenado capilar lento",
                    "Oliguria"
                ],
                "factoresRelacionados": [
                    "Depresion miocardica por hipotermia",
                    "Arritmias cardiacas",
                    "Alteracion de la conduccion cardiaca",
                    "Disminucion de la contractilidad"
                ]
            },
            {
                "codigo": "00038",
                "nombre": "Riesgo de trauma fisico",
                "definicion": "Vulnerable a una lesion corporal accidental que puede comprometer la salud",
                "caracteristicasDefinitorias": [
                    "Falta de coordinacion motora",
                    "Confusion y desorientacion",
                    "Disminucion de la sensibilidad al dolor",
                    "Conducta paradojica (desvestimiento)"
                ],
                "factoresRelacionados": [
                    "Alteracion del nivel de conciencia",
                    "Perdida de coordinacion",
                    "Disminucion de sensibilidad periferica",
                    "Hipotermia cerebral"
                ]
            }
        ],
        "npiNic": [
            {
                "codigo": "3900",
                "nombre": "Regulacion de la temperatura",
                "actividades": [
                    "Monitorizar temperatura central cada 30 minutos",
                    "Aplicar metodo de recalentamiento apropiado al grado de hipotermia",
                    "Administrar liquidos intravenosos calentados a 40-42°C",
                    "Retirar ropa mojada y cubrir con mantas secas",
                    "Registrar curva termica y correlacionar con estado clinico"
                ]
            },
            {
                "codigo": "4040",
                "nombre": "Cuidados cardiacos: agudos",
                "actividades": [
                    "Mantener monitoreo ECG continuo con alarmas",
                    "Minimizar estimulacion cardiaca (movimientos suaves, evitar via central si posible)",
                    "Preparar desfibrilador y farmacos de RCP",
                    "NO desfibrilar si temperatura < 30°C (maximo 3 intentos)",
                    "Administrar vasoactivos con precaucion y dosis ajustadas"
                ]
            },
            {
                "codigo": "6680",
                "nombre": "Monitorizacion de signos vitales",
                "actividades": [
                    "Controlar PA, FC y FR cada 15-30 minutos",
                    "Verificar pulso durante al menos 60 segundos (bradicardia extrema puede simular ausencia de pulso)",
                    "Monitorizar SpO2 continua",
                    "Evaluar ritmo cardiaco y buscar ondas J de Osborn",
                    "Correlacionar signos vitales con temperatura central"
                ]
            }
        ],
        "npiNoc": [
            {
                "codigo": "0800",
                "nombre": "Termorregulacion",
                "indicadores": [
                    "Temperatura central en rango normal (36-37.5°C)",
                    "Ausencia de escalofrios",
                    "Piel tibia y bien perfundida",
                    "Frecuencia cardiaca en rango normal",
                    "Estado de conciencia normal"
                ],
                "escala": "1=Gravemente comprometido, 2=Sustancialmente comprometido, 3=Moderadamente comprometido, 4=Levemente comprometido, 5=No comprometido"
            },
            {
                "codigo": "0802",
                "nombre": "Signos vitales",
                "indicadores": [
                    "PA sistolica y diastolica en rango",
                    "Frecuencia cardiaca 60-100 lpm",
                    "Frecuencia respiratoria 12-20 rpm",
                    "Temperatura central 36-37.5°C"
                ],
                "escala": "1=Desviacion grave, 2=Desviacion sustancial, 3=Desviacion moderada, 4=Desviacion leve, 5=Sin desviacion"
            }
        ],
        "complicaciones": [
            "Fibrilacion ventricular espontanea o inducida por manipulacion",
            "Shock por recalentamiento (vasodilatacion periferica subita con caida de PA)",
            "Coagulopatia (la hipotermia inhibe la cascada de coagulacion in vivo)",
            "Pancreatitis aguda por hipotermia",
            "Rabdomiolisis con insuficiencia renal aguda",
            "Edema pulmonar por redistribucion durante recalentamiento",
            "Acidosis metabolica severa con hiperlactacidemia",
            "Encefalopatia hipoxico-isquemica si paro cardiaco prolongado"
        ],
        "criteriosAlarma": [
            "Temperatura central < 28°C (riesgo inminente de FV)",
            "Fibrilacion ventricular o asistolia",
            "Potasio serico > 12 mEq/L (criterio de irreversibilidad)",
            "Ausencia de respuesta a RCP prolongada con temperatura > 32°C",
            "Acidosis severa pH < 6.8 refractaria al tratamiento",
            "Bradicardia extrema < 30 lpm con hipotension refractaria",
            "Desvestimiento paradojico (signo de hipotermia moderada-severa que puede confundirse con otra causa)"
        ],
        "emergencyLevel": "critico",
        "relatedPathologyIds": [
            "pat_ahogamiento",
            "pat_paro_cardiorrespiratorio",
            "pat_shock",
            "pat_politraumatismo",
            "pat_congelacion"
        ],
        "isPremium": False
    }
]


def main():
    # Read existing pathologies
    with open(PATHOLOGIES_FILE, "r", encoding="utf-8") as f:
        pathologies = json.load(f)

    print(f"Patologias existentes: {len(pathologies)}")

    # Check for duplicates
    existing_ids = {p["id"] for p in pathologies}
    for np in new_pathologies:
        if np["id"] in existing_ids:
            print(f"ADVERTENCIA: {np['id']} ya existe, se omite.")
        else:
            pathologies.append(np)
            print(f"Agregada: {np['id']} - {np['nombre']}")

    # Write back
    with open(PATHOLOGIES_FILE, "w", encoding="utf-8") as f:
        json.dump(pathologies, f, ensure_ascii=False, indent=2)

    # Validate
    with open(PATHOLOGIES_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        validated = json.loads(content)
        print(f"\nValidacion OK: {len(validated)} patologias en el archivo")

    # Count trauma pathologies
    trauma_count = sum(1 for p in validated if p.get("bodySystemId") == "traumatologico")
    print(f"Patologias traumatologicas: {trauma_count}")

    # Update body_systems.json
    with open(BODY_SYSTEMS_FILE, "r", encoding="utf-8") as f:
        body_systems = json.load(f)

    for bs in body_systems:
        if bs["id"] == "traumatologico":
            old_count = bs["pathologyCount"]
            bs["pathologyCount"] = trauma_count
            print(f"\nbody_systems.json: traumatologico pathologyCount {old_count} -> {trauma_count}")
            break

    with open(BODY_SYSTEMS_FILE, "w", encoding="utf-8") as f:
        json.dump(body_systems, f, ensure_ascii=False, indent=2)

    # Validate body_systems
    with open(BODY_SYSTEMS_FILE, "r", encoding="utf-8") as f:
        json.loads(f.read())
        print("body_systems.json validacion OK")

    print(f"\nTotal de patologias en el archivo: {len(validated)}")


if __name__ == "__main__":
    main()
