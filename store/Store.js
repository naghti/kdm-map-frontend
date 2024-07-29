import {create} from "zustand"
import {nextConfig} from "../next.config";

export const usePointsStore = create((set, get) => ({
    points: [],
    filteredPoints: [],
    filterByText: "",
    filterByType: nextConfig.filterByTypeStockValue,
    filterByNosological: nextConfig.filterByNosologicalStockValue,
    activePointer: {},

    changePoints: (array) => set(() => ({
        points: array,
        filteredPoints: array,
    })),
    _changeFilteredPoints: (array) => set(() => ({
        filteredPoints: array,
    })),

    changeFilterByText: (value) => {
        set(() => ({filterByText: value}))
        get()._useFilterManager(get().filterByText, get().filterByType, get().filterByNosological)
    },
    changeFilterByType: (value) => {
        set(() => ({filterByType: value}))
        get()._useFilterManager(get().filterByText, get().filterByType, get().filterByNosological)
    },
    changeFilterByNosological: (value) => {
        set(() => ({filterByNosological: value}))
        get()._useFilterManager(get().filterByText, get().filterByType, get().filterByNosological)
    },
    changeActivePointer: (value) => set(() => ({ activePointer: value })),

    _useFilterManager: (text, type, nosological) => {

        const sorted = get().points.filter(point => {
            let textPass = true, typePass = true, nosologicalPass = true
            if (text.trim().toLowerCase() != "" && point.name.toLowerCase().indexOf(text.trim()) == -1) {
                textPass = false
            }
            if (type !== nextConfig.filterByTypeStockValue && point.type != type) {
                typePass = false
            }
            if (nosological !== nextConfig.filterByNosologicalStockValue) {
                const pointAccessibility = JSON.parse(point.accessibility[0])

                for (let i = 0; i < pointAccessibility.length; i++) {
                    const item = pointAccessibility[i]
                    if (item.name == nosological && item.available < 1) nosologicalPass = false
                }
            }
            return textPass && typePass && nosologicalPass
        })

        set(() => ({
            filteredPoints: sorted
        }))
    }
}))