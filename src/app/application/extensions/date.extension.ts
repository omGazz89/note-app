// Ho utilizzato un'extension per formattare la data, non c'è un vero motivo tecnico. Angular come
// best practice in questo caso consiglierebbe di utilizzare una pipe custom 

export class date {
    static today(): string {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); 
            const hours = String("0" + today.getHours()).slice(-2)
            const minutes = String("0" + today.getMinutes()).slice(-2)
            const yyyy = today.getFullYear();
            
            return mm + '/' + dd + '/' + yyyy + "-" + hours + ":" + minutes;
          
    }
}