package br.edu.utfpr.pb.pw26s.server.model.tipo;

public enum TipoConta {
    CCORRENTE(0),
    CPOUPANCA(1),
    CARTAO(2);

    private int codigo;

    TipoConta(int codigo ){
        this.codigo=codigo;
    }
    public  int getCodigo(){
        return codigo;
    }
    public static TipoConta getObjetoEnum(int codigo) {

        for (TipoConta dse : TipoConta.values()) {
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
