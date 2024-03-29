export interface ContextProps {
    user: ResponseData
    login: (email, password) => Promise<string>
    logout: any
    fetchAll: (email) => Promise<ResponseData>
    saveRecord: (email, canvasdata, name) => Promise<void>
    updateRecord: (email, canvasdata, name) => Promise<void>
}
export interface ResponseData {
    status: string
    data: {
        ispaid: boolean
        data: Board[] // You can specify the type of data array items if you have any specific type
        pass: string
        email: string
    }
}
export interface Board {
    name: string;
    canvasData: any;
}
const url = 'https:/node.blazingbane.com/excali/'
// const url = 'http://172.27.239.102:3003/excali/'
export const devURL ={
   login: url+'login',
   delete: url,
   update:url+'update',
   signup:url+'signup',
   save:url+'save',
   all:url+'all'
}
export const PURL = {   

}
export function checkName(name: string, data: Board[]): boolean {
    data.forEach((board) => {
        if (board.canvasData == name)
            return false
    })
    return true
}