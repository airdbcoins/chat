let messages = [];

export default function handler(req, res) {

    if(req.method === 'GET'){
        return res.status(200).json(messages);
    }

    if(req.method === 'POST'){
        const { user, color, type, content } = req.body;

        messages.push({
            user,
            color,
            type,
            content
        });

        return res.status(200).json({ ok: true });
    }
}