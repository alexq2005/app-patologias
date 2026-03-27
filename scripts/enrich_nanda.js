/**
 * Enrich NANDA diagnoses — adds clinically accurate NANDA-I diagnoses
 * to pathologies that have fewer than 3.
 *
 * All codes are from NANDA-I taxonomy (2021-2023).
 * All content is appropriate for Latin American nursing education.
 */

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'pathologies.json');
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

// ── NANDA to add per pathology ───────────────────────────

const additions = {
  // ============ 12 pathologies with 1 NANDA (add 2 each) ============

  pat_ulcera_peptica: [
    {
      codigo: '00002',
      nombre: 'Desequilibrio nutricional: ingesta inferior a las necesidades',
      definicion: 'Consumo de nutrientes insuficiente para satisfacer las necesidades metabolicas',
      caracteristicasDefinitorias: [
        'Dolor epigastrico postprandial que limita la ingesta',
        'Perdida de peso involuntaria',
        'Aversion a los alimentos por temor al dolor',
      ],
      factoresRelacionados: [
        'Incapacidad para ingerir alimentos por dolor',
        'Restriccion dietetica prolongada',
        'Nauseas asociadas a la patologia gastrica',
      ],
    },
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Preocupacion por posibles complicaciones',
        'Inquietud',
        'Expresion de temor ante hemorragia digestiva',
      ],
      factoresRelacionados: [
        'Amenaza para el estado de salud',
        'Cambios en el patron de alimentacion',
        'Incertidumbre sobre el pronostico',
      ],
    },
  ],

  pat_hemorragia_digestiva: [
    {
      codigo: '00029',
      nombre: 'Disminucion del gasto cardiaco',
      definicion: 'Cantidad de sangre bombeada por el corazon insuficiente para satisfacer las demandas metabolicas del organismo',
      caracteristicasDefinitorias: [
        'Taquicardia compensatoria',
        'Hipotension arterial',
        'Palidez cutanea y frialdad distal',
        'Disminucion del llenado capilar',
      ],
      factoresRelacionados: [
        'Reduccion del volumen circulante por hemorragia activa',
        'Hipovolemia aguda',
      ],
    },
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Expresion de temor ante la presencia de sangre',
        'Taquicardia',
        'Agitacion psicomotora',
      ],
      factoresRelacionados: [
        'Amenaza vital percibida',
        'Hospitalizacion de urgencia',
        'Incertidumbre sobre la causa del sangrado',
      ],
    },
  ],

  pat_apendicitis: [
    {
      codigo: '00004',
      nombre: 'Riesgo de infeccion',
      definicion: 'Vulnerable a una invasion y multiplicacion de organismos patogenos que puede comprometer la salud',
      caracteristicasDefinitorias: [
        'Fiebre',
        'Leucocitosis con neutrofilia',
        'Defensa abdominal',
      ],
      factoresRelacionados: [
        'Perforacion apendicular potencial',
        'Procedimiento quirurgico (apendicectomia)',
        'Ruptura de barrera gastrointestinal',
      ],
    },
    {
      codigo: '00134',
      nombre: 'Nauseas',
      definicion: 'Sensacion subjetiva y desagradable en la parte posterior de la garganta, epigastrio o abdomen que puede provocar vomito',
      caracteristicasDefinitorias: [
        'Sensacion nauseosa referida',
        'Aversion a los alimentos',
        'Sialorrea',
      ],
      factoresRelacionados: [
        'Irritacion peritoneal',
        'Dolor abdominal agudo',
        'Distension abdominal',
      ],
    },
  ],

  pat_obstruccion_intestinal: [
    {
      codigo: '00132',
      nombre: 'Dolor agudo',
      definicion: 'Experiencia sensitiva y emocional desagradable asociada a dano tisular real o potencial de inicio subito o lento, de intensidad leve a grave',
      caracteristicasDefinitorias: [
        'Dolor abdominal colico',
        'Facies de dolor',
        'Posicion antialgica',
        'Distension abdominal dolorosa',
      ],
      factoresRelacionados: [
        'Distension de asas intestinales',
        'Isquemia de pared intestinal',
        'Aumento de la presion intraluminal',
      ],
    },
    {
      codigo: '00134',
      nombre: 'Nauseas',
      definicion: 'Sensacion subjetiva y desagradable en la parte posterior de la garganta, epigastrio o abdomen que puede provocar vomito',
      caracteristicasDefinitorias: [
        'Nauseas persistentes',
        'Vomitos de contenido intestinal',
        'Inapetencia total',
      ],
      factoresRelacionados: [
        'Distension gastrica e intestinal',
        'Acumulacion de contenido proximal a la obstruccion',
        'Estimulacion vagal por distension',
      ],
    },
  ],

  pat_dm1: [
    {
      codigo: '00126',
      nombre: 'Conocimientos deficientes',
      definicion: 'Carencia de informacion cognitiva relacionada con un tema especifico o su adquisicion',
      caracteristicasDefinitorias: [
        'Verbalizacion de desconocimiento sobre autoinyeccion de insulina',
        'Seguimiento inadecuado de instrucciones',
        'Errores en el automonitoreo de glucemia',
      ],
      factoresRelacionados: [
        'Falta de exposicion previa al manejo de insulinoterapia',
        'Informacion insuficiente sobre conteo de carbohidratos',
        'Complejidad del regimen terapeutico',
      ],
    },
    {
      codigo: '00078',
      nombre: 'Gestion de salud ineficaz',
      definicion: 'Patron de regulacion e integracion en la vida diaria de un regimen terapeutico que no es adecuado para alcanzar objetivos de salud',
      caracteristicasDefinitorias: [
        'Dificultad para integrar el regimen de insulina en la vida diaria',
        'Hemoglobina glicosilada fuera de rango objetivo',
        'Episodios frecuentes de hipoglucemia o hiperglucemia',
      ],
      factoresRelacionados: [
        'Complejidad del regimen terapeutico',
        'Deficit de conocimiento sobre la enfermedad',
        'Barreras economicas para acceder a insumos',
      ],
    },
  ],

  pat_hipotiroidismo: [
    {
      codigo: '00015',
      nombre: 'Riesgo de estrenimiento',
      definicion: 'Vulnerable a una disminucion en la frecuencia normal de defecacion acompanada de eliminacion dificultosa o incompleta',
      caracteristicasDefinitorias: [
        'Disminucion de la frecuencia de evacuaciones',
        'Heces duras y secas',
        'Esfuerzo excesivo para defecar',
      ],
      factoresRelacionados: [
        'Disminucion del peristaltismo por deficit de hormonas tiroideas',
        'Actividad fisica reducida por fatiga',
        'Ingesta hidrica insuficiente',
      ],
    },
    {
      codigo: '00002',
      nombre: 'Desequilibrio nutricional: ingesta superior a las necesidades',
      definicion: 'Consumo de nutrientes que excede las necesidades metabolicas',
      caracteristicasDefinitorias: [
        'Aumento de peso sin cambio en la ingesta',
        'Edema generalizado',
        'Indice de masa corporal elevado',
      ],
      factoresRelacionados: [
        'Disminucion del metabolismo basal',
        'Reduccion de la termogenesis',
        'Retencion hidrica por mixedema',
      ],
    },
  ],

  pat_hipertiroidismo: [
    {
      codigo: '00002',
      nombre: 'Desequilibrio nutricional: ingesta inferior a las necesidades',
      definicion: 'Consumo de nutrientes insuficiente para satisfacer las necesidades metabolicas',
      caracteristicasDefinitorias: [
        'Perdida de peso a pesar de ingesta adecuada',
        'Hipermetabolismo',
        'Masa muscular disminuida',
      ],
      factoresRelacionados: [
        'Aumento del metabolismo basal por exceso de hormonas tiroideas',
        'Hiperactividad gastrointestinal con malabsorcion',
        'Demanda calorica aumentada',
      ],
    },
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Inquietud y nerviosismo constante',
        'Taquicardia',
        'Temblor fino de manos',
        'Insomnio',
      ],
      factoresRelacionados: [
        'Hiperexcitabilidad del sistema nervioso simpatico',
        'Efecto directo del exceso de hormonas tiroideas',
        'Incertidumbre sobre el pronostico',
      ],
    },
  ],

  pat_addison: [
    {
      codigo: '00093',
      nombre: 'Fatiga',
      definicion: 'Sensacion abrumadora y sostenida de agotamiento y disminucion de la capacidad de trabajo fisico y mental',
      caracteristicasDefinitorias: [
        'Cansancio no proporcional a la actividad',
        'Verbalizacion de falta de energia constante',
        'Incapacidad para mantener rutinas habituales',
      ],
      factoresRelacionados: [
        'Deficit de cortisol',
        'Hipotension arterial cronica',
        'Hipoglucemia recurrente',
      ],
    },
    {
      codigo: '00179',
      nombre: 'Riesgo de nivel de glucemia inestable',
      definicion: 'Vulnerable a variaciones en los niveles de glucosa que pueden comprometer la salud',
      caracteristicasDefinitorias: [
        'Episodios de hipoglucemia',
        'Temblor y diaforesis',
        'Debilidad subita',
      ],
      factoresRelacionados: [
        'Deficit de cortisol que altera la gluconeogenesis',
        'Ingesta alimentaria irregular',
        'Estres fisiologico intercurrente',
      ],
    },
  ],

  pat_ira_renal: [
    {
      codigo: '00025',
      nombre: 'Exceso de volumen de liquidos',
      definicion: 'Aumento de la retencion de liquidos isotonicos',
      caracteristicasDefinitorias: [
        'Edema periferico',
        'Oliguria o anuria',
        'Aumento de peso rapido',
        'Crepitantes pulmonares',
      ],
      factoresRelacionados: [
        'Falla de mecanismos renales de filtracion',
        'Retencion de sodio y agua',
        'Disminucion de la tasa de filtracion glomerular',
      ],
    },
    {
      codigo: '00004',
      nombre: 'Riesgo de infeccion',
      definicion: 'Vulnerable a una invasion y multiplicacion de organismos patogenos que puede comprometer la salud',
      caracteristicasDefinitorias: [
        'Leucocitosis o leucopenia',
        'Fiebre',
        'Signos locales de infeccion en accesos vasculares',
      ],
      factoresRelacionados: [
        'Uremia con inmunosupresion secundaria',
        'Procedimientos invasivos (cateter de dialisis)',
        'Estancia hospitalaria prolongada',
      ],
    },
  ],

  pat_litiasis: [
    {
      codigo: '00016',
      nombre: 'Deterioro de la eliminacion urinaria',
      definicion: 'Disfuncion en la eliminacion de orina',
      caracteristicasDefinitorias: [
        'Disuria',
        'Hematuria',
        'Polaquiuria',
        'Urgencia miccional',
      ],
      factoresRelacionados: [
        'Obstruccion parcial de la via urinaria por calculo',
        'Irritacion de mucosa ureteral',
        'Espasmo ureteral',
      ],
    },
    {
      codigo: '00004',
      nombre: 'Riesgo de infeccion',
      definicion: 'Vulnerable a una invasion y multiplicacion de organismos patogenos que puede comprometer la salud',
      caracteristicasDefinitorias: [
        'Fiebre',
        'Orina turbia o maloliente',
        'Leucocituria',
      ],
      factoresRelacionados: [
        'Estasis urinaria por obstruccion litiasica',
        'Instrumentacion urologica (cateterismo, litotricia)',
        'Lesion de mucosa por migracion del calculo',
      ],
    },
  ],

  pat_sindrome_nefrotico: [
    {
      codigo: '00004',
      nombre: 'Riesgo de infeccion',
      definicion: 'Vulnerable a una invasion y multiplicacion de organismos patogenos que puede comprometer la salud',
      caracteristicasDefinitorias: [
        'Fiebre',
        'Leucocitosis',
        'Signos de peritonitis espontanea',
      ],
      factoresRelacionados: [
        'Perdida de inmunoglobulinas por proteinuria masiva',
        'Edema como medio de cultivo',
        'Tratamiento inmunosupresor',
      ],
    },
    {
      codigo: '00002',
      nombre: 'Desequilibrio nutricional: ingesta inferior a las necesidades',
      definicion: 'Consumo de nutrientes insuficiente para satisfacer las necesidades metabolicas',
      caracteristicasDefinitorias: [
        'Hipoalbuminemia severa',
        'Perdida de masa muscular',
        'Inapetencia por edema de mucosa intestinal',
      ],
      factoresRelacionados: [
        'Perdida proteica urinaria masiva',
        'Restriccion dietetica de sodio y proteinas',
        'Anorexia por uremia',
      ],
    },
  ],

  pat_glomerulonefritis: [
    {
      codigo: '00093',
      nombre: 'Fatiga',
      definicion: 'Sensacion abrumadora y sostenida de agotamiento y disminucion de la capacidad de trabajo fisico y mental',
      caracteristicasDefinitorias: [
        'Cansancio desproporcionado a la actividad',
        'Somnolencia diurna',
        'Verbalizacion de falta de energia',
      ],
      factoresRelacionados: [
        'Anemia por disminucion de eritropoyetina',
        'Retencion de toxinas uremicas',
        'Sobrecarga de volumen',
      ],
    },
    {
      codigo: '00004',
      nombre: 'Riesgo de infeccion',
      definicion: 'Vulnerable a una invasion y multiplicacion de organismos patogenos que puede comprometer la salud',
      caracteristicasDefinitorias: [
        'Fiebre',
        'Leucocitosis',
        'Deterioro de la funcion inmune',
      ],
      factoresRelacionados: [
        'Tratamiento inmunosupresor (corticoides, ciclofosfamida)',
        'Proteinuria con perdida de inmunoglobulinas',
        'Procedimientos invasivos diagnosticos',
      ],
    },
  ],

  // ============ 21 pathologies with 2 NANDA (add 1 each) ============

  pat_fa: [
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Palpitaciones percibidas como amenazantes',
        'Temor a eventos tromboembolicos',
        'Inquietud',
      ],
      factoresRelacionados: [
        'Irregularidad del ritmo cardiaco percibida',
        'Riesgo conocido de ACV',
        'Necesidad de anticoagulacion cronica',
      ],
    },
  ],

  pat_tvp: [
    {
      codigo: '00132',
      nombre: 'Dolor agudo',
      definicion: 'Experiencia sensitiva y emocional desagradable asociada a dano tisular real o potencial',
      caracteristicasDefinitorias: [
        'Dolor en pantorrilla o muslo',
        'Signo de Homans positivo',
        'Edema unilateral doloroso',
      ],
      factoresRelacionados: [
        'Obstruccion venosa por trombo',
        'Inflamacion de la pared venosa',
        'Edema tisular por estasis venosa',
      ],
    },
  ],

  pat_eap: [
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Sensacion de muerte inminente',
        'Diaforesis profusa',
        'Agitacion psicomotora',
      ],
      factoresRelacionados: [
        'Disnea severa con dificultad respiratoria',
        'Amenaza vital inmediata',
        'Hospitalizacion de urgencia',
      ],
    },
  ],

  pat_endocarditis: [
    {
      codigo: '00029',
      nombre: 'Disminucion del gasto cardiaco',
      definicion: 'Cantidad de sangre bombeada por el corazon insuficiente para satisfacer las demandas metabolicas',
      caracteristicasDefinitorias: [
        'Taquicardia',
        'Fatiga al esfuerzo minimo',
        'Soplo cardiaco nuevo o cambiante',
      ],
      factoresRelacionados: [
        'Destruccion valvular por vegetaciones',
        'Insuficiencia valvular aguda',
        'Fiebre sostenida con aumento de demanda metabolica',
      ],
    },
  ],

  pat_asma: [
    {
      codigo: '00032',
      nombre: 'Patron respiratorio ineficaz',
      definicion: 'La inspiracion o espiracion no proporciona una ventilacion adecuada',
      caracteristicasDefinitorias: [
        'Disnea espiratoria',
        'Sibilancias',
        'Uso de musculos accesorios',
        'Taquipnea',
      ],
      factoresRelacionados: [
        'Broncoespasmo',
        'Edema de la mucosa bronquial',
        'Hipersecrecion de moco',
      ],
    },
  ],

  pat_tep: [
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Sensacion de muerte inminente',
        'Taquicardia desproporcionada',
        'Agitacion',
      ],
      factoresRelacionados: [
        'Disnea subita severa',
        'Amenaza vital aguda',
        'Dolor toracico pleuritico',
      ],
    },
  ],

  pat_neumotorax: [
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Sensacion de falta de aire subita',
        'Temor expresado',
        'Inquietud marcada',
      ],
      factoresRelacionados: [
        'Disnea de inicio brusco',
        'Dolor toracico agudo',
        'Procedimiento de drenaje pleural',
      ],
    },
  ],

  pat_ira: [
    {
      codigo: '00146',
      nombre: 'Ansiedad',
      definicion: 'Sensacion vaga e inquietante de malestar o amenaza acompanada de una respuesta autonoma',
      caracteristicasDefinitorias: [
        'Sensacion de ahogo',
        'Agitacion',
        'Expresion de temor',
      ],
      factoresRelacionados: [
        'Disnea severa',
        'Dependencia de ventilacion mecanica',
        'Ambiente de cuidados intensivos',
      ],
    },
  ],

  pat_tuberculosis: [
    {
      codigo: '00002',
      nombre: 'Desequilibrio nutricional: ingesta inferior a las necesidades',
      definicion: 'Consumo de nutrientes insuficiente para satisfacer las necesidades metabolicas',
      caracteristicasDefinitorias: [
        'Perdida de peso progresiva',
        'Hiporexia',
        'Debilidad muscular',
      ],
      factoresRelacionados: [
        'Estado hipercatabolico cronico',
        'Inapetencia por enfermedad cronica',
        'Efectos adversos de tuberculostaticos (nauseas)',
      ],
    },
  ],

  pat_epilepsia: [
    {
      codigo: '00126',
      nombre: 'Conocimientos deficientes',
      definicion: 'Carencia de informacion cognitiva relacionada con un tema especifico',
      caracteristicasDefinitorias: [
        'Desconocimiento sobre factores desencadenantes',
        'Incumplimiento del tratamiento antiepileptico',
        'Conductas inadecuadas ante crisis convulsivas',
      ],
      factoresRelacionados: [
        'Falta de educacion sobre la enfermedad',
        'Estigma social que limita la busqueda de informacion',
        'Complejidad del regimen farmacologico',
      ],
    },
  ],

  pat_meningitis: [
    {
      codigo: '00132',
      nombre: 'Dolor agudo',
      definicion: 'Experiencia sensitiva y emocional desagradable asociada a dano tisular real o potencial',
      caracteristicasDefinitorias: [
        'Cefalea intensa',
        'Rigidez de nuca',
        'Fotofobia',
        'Facies de dolor',
      ],
      factoresRelacionados: [
        'Inflamacion de las meninges',
        'Hipertension endocraneana',
        'Irritacion meningea',
      ],
    },
  ],

  pat_parkinson: [
    {
      codigo: '00108',
      nombre: 'Deficit de autocuidado: bano',
      definicion: 'Deterioro de la capacidad para realizar o completar las actividades de higiene de manera independiente',
      caracteristicasDefinitorias: [
        'Incapacidad para acceder al bano de forma segura',
        'Dificultad para manipular elementos de higiene',
        'Necesidad de asistencia para el aseo personal',
      ],
      factoresRelacionados: [
        'Rigidez muscular',
        'Bradicinesia',
        'Temblor en reposo que dificulta la motricidad fina',
      ],
    },
  ],

  pat_alzheimer: [
    {
      codigo: '00155',
      nombre: 'Riesgo de caidas',
      definicion: 'Vulnerable a un aumento de la susceptibilidad a las caidas que puede causar dano fisico',
      caracteristicasDefinitorias: [
        'Deambulacion errante',
        'Desorientacion espacial',
        'Marcha inestable',
      ],
      factoresRelacionados: [
        'Deterioro cognitivo',
        'Desorientacion en espacio y tiempo',
        'Alteracion del juicio y percepcion del peligro',
      ],
    },
  ],

  pat_guillain_barre: [
    {
      codigo: '00004',
      nombre: 'Riesgo de infeccion',
      definicion: 'Vulnerable a una invasion y multiplicacion de organismos patogenos que puede comprometer la salud',
      caracteristicasDefinitorias: [
        'Fiebre',
        'Leucocitosis',
        'Signos de infeccion respiratoria',
      ],
      factoresRelacionados: [
        'Inmovilidad prolongada',
        'Ventilacion mecanica (riesgo de neumonia asociada)',
        'Cateterizacion vesical prolongada',
      ],
    },
  ],

  pat_cirrosis: [
    {
      codigo: '00002',
      nombre: 'Desequilibrio nutricional: ingesta inferior a las necesidades',
      definicion: 'Consumo de nutrientes insuficiente para satisfacer las necesidades metabolicas',
      caracteristicasDefinitorias: [
        'Perdida de masa muscular',
        'Hipoalbuminemia',
        'Inapetencia cronica',
      ],
      factoresRelacionados: [
        'Malabsorcion por disfuncion hepatica',
        'Restriccion dietetica de proteinas',
        'Nauseas y ascitis que limitan la ingesta',
      ],
    },
  ],

  pat_pancreatitis: [
    {
      codigo: '00028',
      nombre: 'Riesgo de deficit de volumen de liquidos',
      definicion: 'Vulnerable a una disminucion del volumen de liquido intravascular, intersticial o intracelular',
      caracteristicasDefinitorias: [
        'Taquicardia',
        'Hipotension',
        'Mucosas secas',
      ],
      factoresRelacionados: [
        'Vomitos persistentes',
        'Secuestro de liquidos en tercer espacio retroperitoneal',
        'Ayuno prolongado con perdidas insensibles',
      ],
    },
  ],

  pat_eii: [
    {
      codigo: '00132',
      nombre: 'Dolor agudo',
      definicion: 'Experiencia sensitiva y emocional desagradable asociada a dano tisular real o potencial',
      caracteristicasDefinitorias: [
        'Dolor abdominal colico',
        'Dolor que se exacerba con la ingesta',
        'Defensa abdominal',
      ],
      factoresRelacionados: [
        'Inflamacion cronica de la mucosa intestinal',
        'Ulceracion de la pared intestinal',
        'Distension intestinal por gas',
      ],
    },
  ],

  pat_dm2: [
    {
      codigo: '00126',
      nombre: 'Conocimientos deficientes',
      definicion: 'Carencia de informacion cognitiva relacionada con un tema especifico',
      caracteristicasDefinitorias: [
        'Desconocimiento sobre dieta adecuada para diabeticos',
        'Errores en la tecnica de automonitoreo de glucemia',
        'No reconoce signos de hipoglucemia',
      ],
      factoresRelacionados: [
        'Falta de educacion diabetologica formal',
        'Informacion contradictoria de fuentes no profesionales',
        'Barrera idiomatica o cultural',
      ],
    },
  ],

  pat_cetoacidosis: [
    {
      codigo: '00030',
      nombre: 'Deterioro del intercambio gaseoso',
      definicion: 'Exceso o deficit en la oxigenacion o en la eliminacion de dioxido de carbono en la membrana alveolocapilar',
      caracteristicasDefinitorias: [
        'Respiracion de Kussmaul',
        'Aliento cetonico (afrutado)',
        'Somnolencia o confusion',
      ],
      factoresRelacionados: [
        'Acidosis metabolica severa con compensacion respiratoria',
        'Deshidratacion que afecta perfusion pulmonar',
        'Alteracion del nivel de conciencia',
      ],
    },
  ],

  pat_irc: [
    {
      codigo: '00093',
      nombre: 'Fatiga',
      definicion: 'Sensacion abrumadora y sostenida de agotamiento y disminucion de la capacidad de trabajo fisico y mental',
      caracteristicasDefinitorias: [
        'Cansancio cronico no aliviado por el descanso',
        'Somnolencia diurna',
        'Disminucion del rendimiento en actividades diarias',
      ],
      factoresRelacionados: [
        'Anemia por deficit de eritropoyetina',
        'Retencion de toxinas uremicas',
        'Alteracion del sueno por prurito uremico',
      ],
    },
  ],

  pat_itu: [
    {
      codigo: '00132',
      nombre: 'Dolor agudo',
      definicion: 'Experiencia sensitiva y emocional desagradable asociada a dano tisular real o potencial',
      caracteristicasDefinitorias: [
        'Disuria (dolor al orinar)',
        'Dolor suprapubico',
        'Dolor lumbar en pielonefritis',
      ],
      factoresRelacionados: [
        'Inflamacion de la mucosa vesical',
        'Espasmo vesical',
        'Irritacion del tracto urinario por bacterias',
      ],
    },
  ],
};

// ── Apply additions ──────────────────────────────────────

let updated = 0;
let added = 0;

for (const p of data) {
  const toAdd = additions[p.id];
  if (!toAdd) continue;

  const existingCodes = new Set(p.npiNanda.map(n => n.codigo));

  for (const nanda of toAdd) {
    if (!existingCodes.has(nanda.codigo)) {
      p.npiNanda.push(nanda);
      added++;
    }
  }
  updated++;
}

// ── Write back ───────────────────────────────────────────

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2), 'utf-8');

console.log(`Updated ${updated} pathologies, added ${added} NANDA diagnoses.`);

// Verify
const verify = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));
const stillLow = verify.filter(p => (p.npiNanda || []).length < 3);
console.log(`Pathologies with <3 NANDA remaining: ${stillLow.length}`);
if (stillLow.length > 0) {
  stillLow.forEach(p => console.log(`  - ${p.nombre}: ${p.npiNanda.length} NANDA`));
}
