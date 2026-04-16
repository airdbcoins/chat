let messages = []; // ذخیره موقت در RAM

const TEN_MINUTES = 10 * 60 * 1000;

// پاکسازی پیام‌های قدیمی
function cleanMessages(){
    const now = Date.now();
    messages = messages.filter(m => now - m.time < TEN_MINUTES);
}

// GET - گرفتن پیام‌ها
export default function handler(req, res) {

    // پاکسازی قبل از هر درخواست
    cleanMessages();

    if(req.method === "GET"){
        return res.status(200).json(messages);
    }

    if(req.method === "POST"){
        const { user, color, type, content, time } = req.body;

        if(!user || !type || !content){
            return res.status(400).json({error:"invalid data"});
        }

        const message = {
            user,
            color: color || "#000",
            type,
            content,
            time: time || Date.now()
        };

        messages.push(message);

        // بعد از اضافه کردن هم دوباره پاکسازی
        cleanMessages();

        return res.status(200).json({success:true});
    }

    return res.status(405).json({error:"method not allowed"});
}