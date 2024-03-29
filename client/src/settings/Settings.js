//GENERAL CONST SETTINGS

//url
export const URL_LOGIN = "http://localhost:3002/login";
export const URL_PASSFORGOTTEN = "http://localhost:3002/passForgotten";
export const URL_SETPASS = "http://localhost:3002/passForgotten/setPass";
export const URL_CUSTOMER = "http://localhost:3002/customers";
export const URL_PROVIDER = "http://localhost:3002/providers";
export const URL_DASHBOARD = "http://localhost:3002/dashboard/";
export const URL_REMARKS = "http://localhost:3002/remarks"
export const URL_CHECKLOGED = "http://localhost:3002/checkLoged";
export const URL_CHATS = "http://localhost:3002/chats";
export const SERVER_HOST = "http://localhost:3002/"
export const URL_PROVINCIAS = (provCode) => {return `https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-spain-provincia&fields=prov_name,prov_code,prov_name_local&q=&rows=60&refine.prov_code=${provCode}`}
export const URL_MUNICIPIOS = (provCode)=>{return `https://public.opendatasoft.com/api/records/1.0/search/?dataset=georef-spain-municipio&fields=prov_name,mun_name&q=&rows=1000&refine.prov_code=${provCode}`}

