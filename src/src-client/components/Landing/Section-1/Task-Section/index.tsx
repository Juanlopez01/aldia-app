import React from "react";

const TaskSection = () => {
	return (
		<>
			<div className={`py-16 w-full bg-main-green dark:bg-[#212552] text-center`}>
				<hr className="text-white pt-12" />

				<div className="text-center w-[90%] md:w-[80%] m-auto py-4 text-gray-300">
					<h2 className="text-center text-3xl md:text-4xl font-bold text-link pb-2">
						¿Qué puedo hacer en ALDÍA?
					</h2>
					<p>
						Con ALDIA, podrás llevar un control exhaustivo de tus ingresos y gastos,
						tanto a nivel personal como en tu negocio. Nuestra aplicación te brinda la
						flexibilidad necesaria para manejar tus finanzas de manera eficiente,
						ayudándote a mantener un equilibrio financiero sólido en todas las áreas
						de tu vida.
					</p>
				</div>

				<div>
					<h3 className="text-center font-bold text-link pt-6">
						Para tus finanzas personales, ALDIA te ofrece:
					</h3>
					<ul className="text-gray-300 pt-2 leading-8">
						<li>Registro detallado de tus ingresos y gastos personales.</li>
						<li>
							Categorización sencilla de transacciones para un seguimiento claro y
							organizado.s
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default TaskSection;
