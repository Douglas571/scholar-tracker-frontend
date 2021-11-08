export default function PerformanceLevelForm() {
	return (
		<div>
			<h1>Escala de Desempeño</h1>
	        <form>
	            <p>
	            	<label>SLP:</label>
	            	<input type="number" name="bottom" 
	            		value="0" disabled/>
	            	-
	            	<input type="number" name="top"/>
	            </p>
	            
	            <h2>Porcentajes</h2>
	            <p>
	            	<label>Becado:</label>
	            	<input type="number" name="scholar-percent"/>
	            </p>
	            <p>
	            	<label>Manager:</label>
	            	<input type="number" name="manager-percent"/>
	            </p>
	            <p>
	            	<label>Inversor:</label>
	            	<input type="number" name="inv-percent"
	              		value="100" disabled/>
	            </p>
	        </form>
		</div>
	)
}