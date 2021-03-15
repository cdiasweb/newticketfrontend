import customAxios from "@/libs/customAxios.ts";
import store from "@/store";
import { user } from "@/types/models";

type defaultReturn = {
    error: boolean;
    message: string;
    data: any;
};


async function saveUser(user: user): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/salvarUsuario",
          method: "post",
          data: {
            user
          },
        }).then((res) => {
            return res.data;

        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar salvar usuario: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar salvar usuario: " + e.message,
            data: ""
        };
    }
}

async function listUser(search = ""): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/listarUsuarios",
          method: "post",
          data: {
              name: search
          }
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar listar usuarios: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar listar usuarios: " + e.message,
            data: ""
        };
    }
}

async function deleteUser(user: user): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/deletarUsuario",
          method: "post",
          data: user,
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar deletar usuario: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar deletar usuario: " + e.message,
            data: ""
        };
    }
}

export {saveUser, listUser, deleteUser};
