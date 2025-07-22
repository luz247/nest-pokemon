export const EnvConfiguration =()=>({
    enviroment:process.env.NODE_ENV || 'dev',
    monogdb:process.env.MONGODB,
    port:process.env.PORT || 3003,
    defaultLimit:process.env.DEFAULT_LIMIT || 7
})