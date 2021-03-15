import customAxios from "@/libs/customAxios.ts";
import store from "@/store";

type defaultReturn = {
    error: boolean;
    message: string;
    data: any;
};

async function listSales(search = ""): Promise<defaultReturn> {
    try {
        return await customAxios({
          url: store.getters.getApiUrl + "/listarVendas",
          method: "post",
          data: {
              name: search
          }
        }).then((res) => {
            return res.data;
        }).catch((error: any) => {
            return {
                error: true,
                message: "Erro ao tentar listar vendas: " + error.message,
                data: ""
            };
        });

    } catch (e) {
        return {
            error: true,
            message: "Erro ao tentar listar vendas: " + e.message,
            data: ""
        };
    }
}

export {listSales};
