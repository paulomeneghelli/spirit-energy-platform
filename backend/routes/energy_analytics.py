from flask import Blueprint, render_template

energy_analytics_bp = Blueprint(
    "energy_analytics",
    __name__
)


@energy_analytics_bp.route("/energy-analytics")
def energy_analytics():

    return render_template(
        "energy_analytics.html"
    )


@energy_analytics_bp.route("/energy-analytics/tarifa-verde-azul")
def tarifa_verde_azul():
    return render_template(
        "analytics/tarifa_verde_azul.html"
    )
