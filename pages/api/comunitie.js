import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {

        const TOKEN = '23786e69cd290b953cc75fa4e3f852';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "967686", // ID Model de "Comunities" criado pelo Dato
            ...request.body,                    
            // title: "Comunidade de teste",
            // imageUrl: "https://github.com/j0tappe.png",
            // creatorSlug: "j0tappe"
        })

        console.log(registroCriado);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: 'é isso ai!'
    })
}