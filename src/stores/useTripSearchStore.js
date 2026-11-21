
import { create } from "zustand";

export const useTripSearchStore = create((set) => ({
    // الفلاتر التي يختارها المستخدم
    searchParams: {
        from: "",
        destination: "",
        date: "",
        travelers: 1,
        companyId: "",
    },

    // الفلاتر التي اعتمدها المستخدم بالضغط على بحث
    appliedFilters: null,

    // تحديث اختيارات المستخدم
    setSearchParams: (newParams) =>
        set((state) => ({
            searchParams: {
                ...state.searchParams,
                ...newParams,
            },
        })),

    // اعتماد الفلاتر عند الضغط على بحث
    applySearch: () =>
        set((state) => ({
            appliedFilters: { ...state.searchParams },
        })),
}));
