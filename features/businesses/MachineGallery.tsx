"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale, Machine } from "@/types/content";

const labels = {
  en: {
    open: "Open machine details",
    close: "Close machine viewer",
    details: "Technical specifications",
    model: "Model",
    power: "Power consumption",
    capacity: "Capacity",
    materials: "Material compatibility",
    functionality: "Functional description",
    workflow: "Usage in production workflow",
    advantages: "Key advantages",
    precision: "Precision / automation level",
    maintenance: "Maintenance notes",
    manufacturer: "Manufacturer details",
    version: "Year / version"
  },
  ar: {
    open: "فتح تفاصيل المعدة",
    close: "إغلاق عارض المعدة",
    details: "المواصفات الفنية",
    model: "الموديل",
    power: "استهلاك الطاقة",
    capacity: "السعة",
    materials: "توافق المواد",
    functionality: "الوصف الوظيفي",
    workflow: "الاستخدام في سير الإنتاج",
    advantages: "المزايا الرئيسية",
    precision: "مستوى الدقة والأتمتة",
    maintenance: "ملاحظات الصيانة",
    manufacturer: "تفاصيل المصنع",
    version: "السنة / الإصدار"
  }
} as const;

type MachineSpecKey = "model" | "manufacturer" | "version" | "power" | "capacity" | "materials" | "functionality" | "workflow" | "precision" | "maintenance";

type MachineSpec = Record<MachineSpecKey, string> & { advantages: string[] };

const specKeys: MachineSpecKey[] = ["model", "manufacturer", "version", "power", "capacity", "materials", "functionality", "workflow", "precision", "maintenance"];

const machineSpecs: Record<Locale, Record<string, Partial<MachineSpec>>> = {
  en: {
    "CNC Router Machine": {
      version: "Current digital-routing production setup",
      materials: "MDF, plywood, hardwood panels, decorative boards, and selected engineered wood sheets",
      workflow: "Used after design coordination to convert approved digital patterns into routed panels, carved details, grooves, and shaped wood components.",
      advantages: ["High repeatability for custom profiles", "Reduces manual layout errors", "Supports decorative and architectural detailing"],
      precision: "Computer-controlled routing with high repeatability for batch and custom production.",
      maintenance: "Requires routine bit inspection, dust extraction checks, bed calibration, and lubrication of moving axes."
    },
    "Edge Banding Machine": {
      version: "Automatic panel-edge finishing line",
      materials: "MDF, plywood, melamine boards, laminate panels, PVC edge tape, ABS tape, and veneer edging",
      workflow: "Used after panel cutting to seal exposed edges before cabinet assembly, wardrobe fabrication, and visible joinery finishing.",
      advantages: ["Clean factory-finished edges", "Improves durability against chipping", "Speeds up repetitive cabinet production"],
      precision: "Automated feeding, bonding, trimming, and buffing for consistent edge alignment.",
      maintenance: "Glue pot, trimming blades, pressure rollers, and buffing wheels should be cleaned and checked regularly."
    },
    "Panel Saw Machine": {
      version: "Precision panel sizing configuration",
      materials: "Large-format sheet goods including MDF, plywood, laminated boards, and engineered panels",
      workflow: "Used at the start of fabrication to dimension raw panels into accurately sized parts for CNC routing, drilling, edging, and assembly.",
      advantages: ["Cleaner cut quality", "Better material yield", "Repeatable panel sizing for batch work"],
      precision: "Guided cutting workflow designed for stable straight cuts and repeatable dimensions.",
      maintenance: "Saw blade sharpness, fence alignment, dust extraction, and sliding mechanisms require scheduled checks."
    },
    "Automatic Drilling Machine": {
      version: "Multi-boring cabinet hardware station",
      materials: "Cabinet panels, wardrobe boards, shelving panels, and hardware-ready furniture components",
      workflow: "Used before assembly to create repeatable hinge, shelf, rail, connector, and hardware holes for modular furniture systems.",
      advantages: ["Consistent hardware placement", "Faster cabinet assembly", "Reduces manual marking and drilling variation"],
      precision: "Multi-point drilling pattern control for repeated system holes and fitting positions.",
      maintenance: "Drill bits, pneumatic lines, stops, and boring heads should be inspected for wear and alignment."
    },
    "Sanding Machine": {
      version: "Wide-belt surface preparation system",
      materials: "Solid wood, veneer-ready panels, MDF, plywood, and coated or pre-finished components",
      workflow: "Used before painting, staining, lamination, or final finishing to create smooth and uniform surfaces.",
      advantages: ["Improves finish adhesion", "Reduces visible surface defects", "Supports premium paint and veneer preparation"],
      precision: "Controlled abrasive workflow for consistent surface leveling across panels.",
      maintenance: "Abrasive belts, pressure settings, feed tracking, and dust collection should be monitored frequently."
    },
    "Paint & Finishing Equipment": {
      version: "Controlled wood-finishing workflow",
      materials: "Prepared wood surfaces, MDF panels, veneer, lacquer-ready components, and custom furniture pieces",
      workflow: "Used after sanding and assembly preparation to apply coatings, stains, lacquers, or protective finishes.",
      advantages: ["More consistent coating quality", "Supports durable premium finishes", "Improves final presentation"],
      precision: "Controlled application environment focused on even coverage and finish repeatability.",
      maintenance: "Spray tools, filters, nozzles, ventilation, and coating preparation areas require regular cleaning."
    },
    "Beam Saw Production Line": {
      version: "Batch cutting and panel dimensioning line",
      materials: "Stacked boards, laminated panels, MDF sheets, plywood, and high-volume project panel materials",
      workflow: "Used when projects require repeated panel sizes, helping prepare batches before secondary machining and assembly.",
      advantages: ["Higher throughput for repeated cuts", "Cleaner batch control", "Efficient handling of project-scale panel work"],
      precision: "Industrial cutting sequence built for repeatable batch dimensions and reduced handling error.",
      maintenance: "Blade condition, clamps, rails, safety sensors, and extraction points should be checked before production cycles."
    },
    "Hot Press Lamination Machine": {
      version: "Hydraulic thermal bonding system",
      materials: "Veneer, laminate sheets, decorative surfaces, plywood, MDF, and engineered panels",
      workflow: "Used to bond decorative faces and laminates to prepared substrates before trimming, cutting, and final finishing.",
      advantages: ["Stable surface bonding", "Improves decorative panel durability", "Supports premium veneer and laminate applications"],
      precision: "Controlled pressure and heat distribution for consistent adhesion across panel surfaces.",
      maintenance: "Press plates, hydraulic pressure, temperature control, and surface cleanliness require routine inspection."
    },
    "Dust Collection System": {
      version: "Central workshop extraction network",
      materials: "Wood dust, MDF dust, sanding residue, cutting chips, and airborne workshop particles",
      workflow: "Operates alongside cutting, sanding, routing, and drilling equipment to keep production areas cleaner and safer.",
      advantages: ["Cleaner production environment", "Better finishing preparation", "Supports equipment reliability"],
      precision: "Multi-point extraction designed to capture residue close to active machinery.",
      maintenance: "Filters, ducts, collection bags, airflow, and connection points require scheduled cleaning."
    },
    "Spray Booth System": {
      version: "Ventilated finishing booth",
      materials: "Paint, lacquer, stain, primer, protective coatings, and prepared wood components",
      workflow: "Used during final finishing to manage airflow, overspray, and coating application quality.",
      advantages: ["Cleaner coating environment", "Improves visual finish", "Helps control overspray and dust contamination"],
      precision: "Controlled ventilation and application area for more stable finishing results.",
      maintenance: "Filters, fans, booth surfaces, nozzles, and ventilation pathways should be cleaned regularly."
    },
    "Assembly & Clamping Station": {
      version: "Joinery alignment and assembly station",
      materials: "Cabinet carcasses, doors, frames, panels, hardware, and custom furniture assemblies",
      workflow: "Used after machining and finishing preparation to align, clamp, and assemble components into stable finished units.",
      advantages: ["Improves assembly accuracy", "Supports cleaner joints", "Reduces movement during curing or fastening"],
      precision: "Guided clamping and alignment workflow for consistent joinery and square assemblies.",
      maintenance: "Clamps, benches, alignment stops, and fastening tools should remain clean and calibrated."
    },
    "Detail Trimming Machine": {
      version: "Precision edge refinement station",
      materials: "Small wood components, profiles, edges, decorative trims, and custom detail pieces",
      workflow: "Used near the end of fabrication to refine edges, profiles, and small details before final inspection.",
      advantages: ["Cleaner edge presentation", "Better fit for custom details", "Supports refined handcrafted finishing"],
      precision: "Detail-focused trimming workflow for small tolerances and finishing refinement.",
      maintenance: "Cutters, guides, bearings, and work surfaces should be inspected for clean detail work."
    }
  },
  ar: {
    "ماكينة راوتر CNC": {
      version: "إعداد إنتاج رقمي حديث للراوتر",
      materials: "MDF والخشب الرقائقي وألواح الخشب الصلب والألواح الزخرفية والأخشاب الهندسية المختارة",
      workflow: "تستخدم بعد تنسيق التصميم لتحويل النماذج الرقمية المعتمدة إلى ألواح محفورة وتفاصيل زخرفية ومجاري ومكونات خشبية مشكلة.",
      advantages: ["تكرار عال للبروفايلات المخصصة", "تقليل أخطاء التخطيط اليدوي", "دعم التفاصيل الزخرفية والمعمارية"],
      precision: "تحكم حاسوبي في الحفر والتشكيل مع تكرار دقيق للإنتاج المخصص والدفعات.",
      maintenance: "تحتاج إلى فحص رؤوس القطع ونظام شفط الغبار ومعايرة الطاولة وتزييت محاور الحركة بانتظام."
    },
    "ماكينة تلبيس الحواف": {
      version: "خط آلي لتشطيب حواف الألواح",
      materials: "MDF والخشب الرقائقي وألواح الميلامين واللامينيت وشرائط PVC وABS والقشرة",
      workflow: "تستخدم بعد قص الألواح لإغلاق الحواف المكشوفة قبل تجميع الخزائن والدواليب وأعمال النجارة الظاهرة.",
      advantages: ["حواف نظيفة بجودة المصنع", "تحسين مقاومة الحواف للتكسر", "تسريع إنتاج الخزائن المتكرر"],
      precision: "تغذية ولصق وقص وتلميع آلي لتحقيق محاذاة حواف ثابتة.",
      maintenance: "يجب تنظيف وفحص حوض الغراء وسكاكين التشذيب وبكرات الضغط وعجلات التلميع."
    },
    "ماكينة قص الألواح": {
      version: "إعداد دقيق لتحديد أبعاد الألواح",
      materials: "ألواح كبيرة الحجم مثل MDF والخشب الرقائقي والألواح الملبسة والهندسية",
      workflow: "تستخدم في بداية التصنيع لتحويل الألواح الخام إلى قطع دقيقة قبل الراوتر والتخريم والتلبيس والتجميع.",
      advantages: ["جودة قص أنظف", "تحسين استهلاك المواد", "تكرار ثابت لأبعاد الألواح"],
      precision: "سير قص موجه لخطوط مستقيمة ثابتة وأبعاد متكررة.",
      maintenance: "تحتاج إلى متابعة حدة السلاح ومحاذاة الدليل ونظام الشفط وآليات الحركة."
    },
    "ماكينة التخريم الآلي": {
      version: "محطة تخريم متعددة لإكسسوارات الخزائن",
      materials: "ألواح الخزائن والدواليب والرفوف ومكونات الأثاث الجاهزة للإكسسوارات",
      workflow: "تستخدم قبل التجميع لتنفيذ ثقوب المفصلات والرفوف والسكك والوصلات والإكسسوارات بتكرار ثابت.",
      advantages: ["تثبيت إكسسوارات متسق", "تسريع تجميع الخزائن", "تقليل اختلاف التخطيط والتخريم اليدوي"],
      precision: "تحكم في أنماط تخريم متعددة للنقاط المتكررة ومواقع الإكسسوارات.",
      maintenance: "يجب فحص رؤوس التخريم وخطوط الهواء والمحددات ورؤوس الحفر من حيث التآكل والمحاذاة."
    },
    "ماكينة الصنفرة": {
      version: "نظام صنفرة عريض لتحضير الأسطح",
      materials: "الخشب الصلب والألواح الجاهزة للقشرة وMDF والخشب الرقائقي والمكونات المطلية مسبقاً",
      workflow: "تستخدم قبل الطلاء أو التلوين أو التلبيس أو التشطيب النهائي لتجهيز أسطح ناعمة ومتجانسة.",
      advantages: ["تحسين التصاق التشطيب", "تقليل عيوب السطح المرئية", "دعم تحضير فاخر للدهان والقشرة"],
      precision: "سير صنفرة محكوم لتحقيق تسوية سطحية متسقة عبر الألواح.",
      maintenance: "تحتاج إلى مراقبة أحزمة الصنفرة والضغط وتتبع التغذية ونظام شفط الغبار."
    },
    "معدات الدهان والتشطيب": {
      version: "سير عمل محكوم لتشطيب الأخشاب",
      materials: "أسطح خشبية محضرة وألواح MDF وقشرة ومكونات جاهزة للاكيه وقطع أثاث مخصصة",
      workflow: "تستخدم بعد الصنفرة والتحضير لتطبيق الطلاء أو التلوين أو اللاكيه أو طبقات الحماية.",
      advantages: ["جودة طلاء أكثر ثباتاً", "دعم تشطيبات فاخرة ومتينة", "تحسين العرض النهائي"],
      precision: "بيئة تطبيق محكومة تركز على التغطية المتجانسة وتكرار جودة التشطيب.",
      maintenance: "تحتاج أدوات الرش والفلاتر والفوهات والتهوية ومناطق تجهيز الطلاء إلى تنظيف منتظم."
    },
    "خط قص ألواح إنتاجي": {
      version: "خط قص وتحديد أبعاد للدفعات",
      materials: "الألواح المكدسة وألواح اللامينيت وMDF والخشب الرقائقي ومواد المشاريع الكبيرة",
      workflow: "يستخدم عندما تتطلب المشاريع أبعاد ألواح متكررة، مما يساعد في تجهيز الدفعات قبل التشغيل الثانوي والتجميع.",
      advantages: ["إنتاجية أعلى للقص المتكرر", "تحكم أفضل في الدفعات", "كفاءة في أعمال الألواح للمشاريع"],
      precision: "تسلسل قص صناعي لأبعاد متكررة وتقليل أخطاء المناولة.",
      maintenance: "يجب فحص السلاح والمشابك والسكك وحساسات السلامة ونقاط الشفط قبل دورات الإنتاج."
    },
    "ماكينة كبس وتلبيس حراري": {
      version: "نظام ربط حراري هيدروليكي",
      materials: "القشرة واللامينيت والأسطح الزخرفية والخشب الرقائقي وMDF والألواح الهندسية",
      workflow: "تستخدم لربط الواجهات الزخرفية واللامينيت بالركائز المحضرة قبل التشذيب والقص والتشطيب النهائي.",
      advantages: ["ربط سطحي مستقر", "تحسين متانة الألواح الزخرفية", "دعم تطبيقات القشرة واللامينيت الفاخرة"],
      precision: "توزيع محكوم للضغط والحرارة لتحقيق التصاق متسق عبر سطح اللوح.",
      maintenance: "تحتاج ألواح الكبس والضغط الهيدروليكي والتحكم الحراري ونظافة السطح إلى فحص دوري."
    },
    "نظام شفط الغبار": {
      version: "شبكة شفط مركزية للورشة",
      materials: "غبار الخشب وغبار MDF وبقايا الصنفرة ورقائق القص والجزيئات العالقة",
      workflow: "يعمل بالتوازي مع معدات القص والصنفرة والراوتر والتخريم للحفاظ على مناطق إنتاج أنظف وأكثر استقراراً.",
      advantages: ["بيئة إنتاج أنظف", "تحضير أفضل للتشطيب", "دعم موثوقية المعدات"],
      precision: "شفط متعدد النقاط مصمم لالتقاط البقايا بالقرب من المعدات النشطة.",
      maintenance: "تحتاج الفلاتر والقنوات وأكياس التجميع وتدفق الهواء ونقاط الاتصال إلى تنظيف مجدول."
    },
    "نظام غرفة الرش": {
      version: "غرفة تشطيب مزودة بالتهوية",
      materials: "الدهان واللاكيه والتلوين والبرايمر وطلاءات الحماية والمكونات الخشبية المحضرة",
      workflow: "تستخدم أثناء التشطيب النهائي للتحكم في تدفق الهواء والرذاذ وجودة تطبيق الطلاء.",
      advantages: ["بيئة طلاء أنظف", "تحسين مظهر التشطيب", "التحكم في الرذاذ وتلوث الغبار"],
      precision: "منطقة تطبيق وتهوية محكومة للحصول على نتائج تشطيب أكثر ثباتاً.",
      maintenance: "يجب تنظيف الفلاتر والمراوح وأسطح الغرفة والفوهات ومسارات التهوية بانتظام."
    },
    "محطة التجميع والكبس": {
      version: "محطة محاذاة وتجميع النجارة",
      materials: "هياكل الخزائن والأبواب والإطارات والألواح والإكسسوارات وتجميعات الأثاث المخصصة",
      workflow: "تستخدم بعد التشغيل والتحضير للتشطيب لمحاذاة وكبس وتجميع المكونات في وحدات نهائية مستقرة.",
      advantages: ["تحسين دقة التجميع", "دعم وصلات أنظف", "تقليل الحركة أثناء التثبيت أو الجفاف"],
      precision: "سير عمل موجه للكبس والمحاذاة لضمان نجارة متسقة وتجميعات مستقيمة.",
      maintenance: "يجب أن تبقى المشابك والطاولات ومحددات المحاذاة وأدوات التثبيت نظيفة ومعايرة."
    },
    "ماكينة تشذيب التفاصيل": {
      version: "محطة تنقية حواف وتفاصيل دقيقة",
      materials: "المكونات الخشبية الصغيرة والبروفايلات والحواف والتشطيبات الزخرفية وقطع التفاصيل المخصصة",
      workflow: "تستخدم قرب نهاية التصنيع لتنقية الحواف والبروفايلات والتفاصيل الصغيرة قبل الفحص النهائي.",
      advantages: ["عرض أنظف للحواف", "ملاءمة أفضل للتفاصيل المخصصة", "دعم التشطيب اليدوي الراقي"],
      precision: "سير تشذيب مخصص للتفاصيل الدقيقة والتحسين النهائي للتفاوتات الصغيرة.",
      maintenance: "يجب فحص القواطع والأدلة والمحامل وأسطح العمل للحفاظ على جودة التفاصيل."
    }
  }
};

function getMachineSpec(machine: Machine, locale: Locale): MachineSpec {
  const enhancement = machineSpecs[locale][machine.name] ?? {};

  return {
    model: machine.model ?? enhancement.model ?? machine.name,
    manufacturer: machine.manufacturer ?? enhancement.manufacturer ?? (locale === "ar" ? "معدات إنتاج احترافية مهيأة لبيئة الورشة" : "Professional production equipment configured for workshop operations"),
    version: enhancement.version ?? (locale === "ar" ? "إعداد تشغيلي حديث" : "Current operational setup"),
    power: machine.power ?? enhancement.power ?? (locale === "ar" ? "تكوين طاقة صناعي حسب متطلبات التشغيل" : "Industrial power configuration based on operating requirements"),
    capacity: machine.capacity ?? enhancement.capacity ?? (locale === "ar" ? "مناسب لأعمال النجارة المعمارية والإنتاج المخصص" : "Suitable for architectural joinery and custom production workflows"),
    materials: enhancement.materials ?? (locale === "ar" ? "الألواح الخشبية ومواد النجارة المختارة حسب مرحلة الإنتاج" : "Wood panels and selected joinery materials based on the production stage"),
    functionality: enhancement.functionality ?? machine.functionality ?? machine.description,
    workflow: enhancement.workflow ?? (locale === "ar" ? "تستخدم ضمن سير تصنيع منظم لتحسين الدقة والجودة والاعتمادية." : "Used within a structured manufacturing workflow to improve accuracy, quality, and reliability."),
    advantages: enhancement.advantages ?? (locale === "ar" ? ["تحسين جودة الإنتاج", "رفع كفاءة التشغيل", "دعم التشطيب الاحترافي"] : ["Improves production quality", "Increases workflow efficiency", "Supports professional finishing standards"]),
    precision: enhancement.precision ?? (locale === "ar" ? "مستوى دقة مناسب للإنتاج الاحترافي المتكرر." : "Precision level suitable for repeated professional production."),
    maintenance: enhancement.maintenance ?? (locale === "ar" ? "تتطلب فحصاً وتنظيفاً دورياً للحفاظ على الأداء." : "Requires routine inspection and cleaning to maintain performance.")
  };
}

export function MachineGallery({ machines, locale }: { machines: Machine[]; locale: Locale }) {
  const [activeMachine, setActiveMachine] = useState<Machine | null>(null);
  const copy = labels[locale];

  useEffect(() => {
    if (!activeMachine) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMachine(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeMachine]);

  return (
    <>
      <div className="grid four machineGrid">
        {machines.map((machine) => (
          <motion.button
            type="button"
            className="glass card machineCard machineCardButton"
            key={machine.name}
            onClick={() => setActiveMachine(machine)}
            aria-label={`${copy.open}: ${machine.name}`}
            whileHover={{ y: -5, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <Image src={machine.image} width={520} height={360} alt={machine.name} loading="lazy" />
            <span className="machineCardContent">
              <strong>{machine.name}</strong>
              <span>{machine.description}</span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeMachine ? (
          <motion.div
            className="machineModalOverlay"
            role="dialog"
            aria-modal="true"
            aria-label={activeMachine.name}
            onClick={() => setActiveMachine(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              className="machineModal"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="machineModalClose" type="button" onClick={() => setActiveMachine(null)} aria-label={copy.close}>
                <X size={20} />
              </button>

              <div className="machineModalImage">
                <Image src={activeMachine.image} width={1200} height={820} alt={activeMachine.name} sizes="(max-width: 900px) 92vw, 58vw" />
              </div>

              <div className="machineModalDetails">
                {(() => {
                  const spec = getMachineSpec(activeMachine, locale);

                  return (
                    <>
                      <p className="eyebrow">{copy.details}</p>
                      <h3>{activeMachine.name}</h3>
                      <p className="machineModalIntro">{spec.functionality}</p>
                      <dl>
                        {specKeys.map((key) => (
                          <div key={key}>
                            <dt>{copy[key]}</dt>
                            <dd>{spec[key]}</dd>
                          </div>
                        ))}
                      </dl>
                      <section className="machineAdvantages">
                        <h4>{copy.advantages}</h4>
                        <ul>
                          {spec.advantages.map((advantage) => (
                            <li key={advantage}>{advantage}</li>
                          ))}
                        </ul>
                      </section>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
