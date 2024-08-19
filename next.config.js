
const nextConfig = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    filterByTypeStockValue: "Тип учреждения",
    filterByNosologicalStockValue: "Нозологическая группа",
    nosologicalGroup: {
        "invalid": "Маломобильные граждане",
        "bleed": "Инвалиды по зрению",
        "ear": "Инвалиды по слуху",
    }
}

module.exports = {nextConfig}
