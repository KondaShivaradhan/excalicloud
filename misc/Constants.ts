export interface ContextProps {
    user: ResponseData
    login: (email, password) => Promise<ResponseData>
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

export function checkName(name: string, data: Board[]): boolean {
    data.forEach((board) => {
        if (board.canvasData == name)
            return false
    })
    return true
}