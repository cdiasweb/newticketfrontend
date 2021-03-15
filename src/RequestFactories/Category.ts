import customAxios from "@/libs/customAxios.ts";
import store from "@/store";
import { category } from "@/types/models";

type defaultReturn = {
    error: boolean;
    message: string;
    data: any;
};


async function saveCategory(category: category): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/salvarCategoria",
          method: "post",
          data: category,
        }).then((res) => {
            return res.data;

        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar salvar categoria: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar salvar categoria: " + e.message,
            data: ""
        };
    }
}

async function listCategory(search = ""): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/listarCategorias",
          method: "post",
          data: {
              name: search
          }
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar listar categorias: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar listar categorias: " + e.message,
            data: ""
        };
    }
}

async function deleteCategory(category: category): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/deletarCategoria",
          method: "post",
          data: category,
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar deletar categoria: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar salvar categoria: " + e.message,
            data: ""
        };
    }
}

export {saveCategory, listCategory, deleteCategory};
