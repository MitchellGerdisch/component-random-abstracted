import * as pulumi from "@pulumi/pulumi";
import * as random from "@pulumi/random";

export interface PetAbstractedArgs {
    size: string;
}

// This resources helps you create a self signed certificate.
export class PetAbstracted extends pulumi.ComponentResource {
    // The PEM of your self signed cert.
    public readonly petName: pulumi.Output<string>;

    constructor(name: string, args: PetAbstractedArgs, opts?: pulumi.ComponentResourceOptions) {
        super("random-abstracted:index:PetAbstracted", name, args, opts);

        const size = args.size || "small";

        var petNameLength: number;
        switch (size) {
            case "small":
                petNameLength = 2;
                break;
            case "medium":
                petNameLength = 4;
                break;
            case "large":
                petNameLength = 6;
                break;
            case "extra-large":
                petNameLength = 8;
                break;
            default:
                throw new Error("Invalid size. Must be small, medium, large or extra-large.");
        }

        const petName = new random.RandomPet("petName", {
            length: petNameLength,
        }, { parent: this });

        this.petName = petName.id
    }
}