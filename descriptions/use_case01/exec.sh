eye --traditional --quick-answere --tactic transaction --query goal03.n3 preference.n3 boards/* vocabularies/* inference/* services/* > outputs/out.n3
eye --traditional outputs/out.n3 parser/services.n3 parser/path.n3 --query parser/composition.n3 --nope