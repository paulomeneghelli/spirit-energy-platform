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