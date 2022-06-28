import React from "react";

const CounterField: React.FC<{
    period: string,
    value: string
}> = ({ period, value }) => {
    const values = value.split("");

    return (
        <div
            className="ion-margin-vertical "
            key={period}
            style={{
                display: "flow",
                flexDirection: "column"
            }}
        >
            <div
                style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: 20
                }}
            >
                {period}
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifySelf: "center"
                    }}
                >
                    {values.map((number) => {
                        return (
                            <div
                                style={{
                                    color: "white",
                                    background: "error",
                                    margin: "inherit",
                                    border: "black",
                                    borderRadius: 1,
                                    width: 18,
                                    height: 30,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {number}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CounterField;
