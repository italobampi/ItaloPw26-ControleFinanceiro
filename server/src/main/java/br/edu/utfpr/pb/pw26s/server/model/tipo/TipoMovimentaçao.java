package br.edu.utfpr.pb.pw26s.server.model.tipo;

public enum TipoMovimentaçao {
    RECEITA(0),
    DESPESA(1),
    TRANSFERENCIA(2);

    private int codigo;

    TipoMovimentaçao(int codigo ){
        this.codigo=codigo;
    }
    public  int getCodigo(){
        return codigo;
    }
    public static TipoMovimentaçao getObjetoEnum(int codigo) {

        for (TipoMovimentaçao dse : TipoMovimentaçao.values()) {
            if (dse.getCodigo()==(codigo)) {
                return dse;
            }
        }

        throw new IllegalArgumentException();
    }

    public static TipoMovimentaçao getObjetoEnum(String nome) {

        for (TipoMovimentaçao dse : TipoMovimentaçao.values()) {
            if (dse.name().equals(nome)) {
                return dse;
            }
        }

        throw new IllegalArgumentException();
    }
}
