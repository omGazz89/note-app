/* Ho preferito strutturare l'applicativo a layer domain, application, data, presentation.
Nel nostro caso NOTE è un'entità di dominio */
export interface Note {
title: string;
content: string;
update: string;
}
