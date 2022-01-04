const token = 'TELEGRAM_TOKEN'
const bot_username = '@bot_username'
const master_id = MASTER_ID

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    if(request.method == 'POST'){
        let data = await request.json()
        if(data.message !== undefined){
            handlemessage(data.message)
        }else if(data.inline_query !== undefined){
            handleinline(data.inline_query)
        }
    }
    return new Response('ok', {status: 200})
}
async function handlemessage(d){
    let chat_id = d.chat.id
    let text = d.text || ''
    let otext = text.split(' ')
    if(text[0] == '!' && chat_id=="CHAT_ID"){
        otext[0] = otext[0].replace('!','').replace(bot_username,'')
        switch (otext[0]) {
            case 'locator':
                await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://k7fry.com/grid/?qth=' + otext[1] + '&t=n'
                })
                break
            case 'qrz':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://www.qrz.com/db/' + otext[1]
                })
                break
            case 'qrzcq':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://www.qrzcq.com/?q=' + otext[1]
                })
                break
            case 'aprs':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://aprs.fi/info/?call=' + otext[1]
                })
                break
            case 'dxwatch':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://www.dxwatch.com/dxsd1/dxsd1.php?f=0&t=dx&c=' + otext[1]
                })
                break
            case 'hamcall':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://hamcall.net/call/' + otext[1]
                })
                break
            case 'eham':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://eham.net/spots/view-user?id=' + otext[1]
                })
                break
            case 'toplu':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'https://www.qrz.com/db/' + otext[1] + '\n' +
                    'https://www.qrzcq.com/?q=' + otext[1] + '\n' +
                    'https://aprs.fi/info/?call=' + otext[1] + '\n' +
                    'https://www.dxwatch.com/dxsd1/dxsd1.php?f=0&t=dx&c=' + otext[1] + '\n' +
                    'https://hamcall.net/call/' + otext[1] + '\n' +
                    'https://eham.net/spots/view-user?id=' + otext[1],
                    disable_web_page_preview: true
                })
                break
            case 'liste':
              await tg(token,'sendmessage',{
                    chat_id: chat_id,
                    text: 'Komut Listesi\n\n' +
                    '!locator - locator arama\n' +
                    '!qrz - QRZ.com\n' +
                    '!qrzcq - qrzcq.com\n' +
                    '!aprs - aprs.fi\n' +
                    '!dxwatch - dxwatch.com\n' +
                    '!hamcall - hamcall.net\n' +
                    '!eham - eham.net\n' +
                    '!toplu - toplu çağrı işareti arama\n' + 
                    '!liste - komut listesi' ,
                    disable_web_page_preview: true
                })
                break
                
        }
    }
}

async function tg(token,type,data,n = true){
    try {
        let t = await fetch('https://api.telegram.org/bot' + token + '/' + type,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        let d = await t.json()
        if(!d.ok && n)
            throw d
        else
            return d
    }catch(e){
        await tg(token,'sendmessage',{
            chat_id: master_id,
            text: 'Request tg error\n\n' /**+ JSON.stringify(data) + '\n\n' */ + JSON.stringify(e)
        },false)
        return e
    }
} 
