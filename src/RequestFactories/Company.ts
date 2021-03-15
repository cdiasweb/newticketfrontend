import customAxios from "@/libs/customAxios.ts";
import store from "@/store";
import { imageUploadPreview, company } from "@/types/models";

type defaultReturn = {
    error: boolean;
    message: string;
    data: any;
};


async function saveCompany(data: any): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/company/register",
          method: "post",
          data
        }).then((res) => {
            return res.data;

        }).catch((error: any) => {
            console.log(error);
            return {
                error: true,
                message: "Erro ao tentar salvar empresa: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar salvar empresa: " + e.message,
            data: ""
        };
    }
}

async function listCompany(search = ""): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/listarProdutos",
          method: "post",
          data: {
              name: search
          }
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar listar produtos: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar listar produtos: " + e.message,
            data: ""
        };
    }
}

async function deleteCompany(company: company): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/deletarProduto",
          method: "post",
          data: company,
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar deletar produto: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar salvar produto: " + e.message,
            data: ""
        };
    }
}

async function deleteImageCompany(image: number|undefined): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/deletarImagemProduto",
          method: "post",
          data: {
            image
          },
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar deletar a imagem do produto: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar excluir a imagem do produto: " + e.message,
            data: ""
        };
    }
}

export {saveCompany, listCompany, deleteCompany, deleteImageCompany};
