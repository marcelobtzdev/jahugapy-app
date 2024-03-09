import { SafeAreaView, StyleSheet, View, ScrollView, Text } from "react-native";
import commonStyles from "../styles/common";

const PrivacyPolicy = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Text style={[commonStyles.textBold, { fontSize: 18, marginBottom: 10 }]}>Política de Privacidad JahugaPy</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Última actualización: 24 de febrero del 2024</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>JahugaPy informa a los usuarios de la aplicación móvil acerca de su política de protección de datos de carácter personal (en adelante, "los Datos Personales") para que éstos determinen libre y voluntariamente si desean facilitar a JahugaPy los Datos Personales que se les puedan requerir o que se puedan obtener de los Usuarios con ocasión del registro o alta en la aplicación móvil de JahugaPy.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>La aplicación movil de JahugaPy son mantenidos y desarrollados por JahugaPy. Puede realizar consultas sobre como usamos sus datos personales enviandonos un email a contacto@jahugaparaguay.com.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>JahugaPy se reserva el derecho a modificar la presente política para adaptarla a novedades legislativas o jurisprudenciales así como a prácticas de la industria. En dichos supuestos, JahugaPy anunciará en esta página las futuras modificaciones.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Con este objeto, JahugaPy proporciona a los Usuarios los recursos técnicos adecuados para que, con carácter previo, puedan acceder a este aviso sobre la Política de Privacidad o a cualquier otra información relevante y puedan prestar su consentimiento a fin de que JahugaPy proceda al tratamiento automatizado de sus Datos Personales. Las respuestas a las preguntas sobre Datos Personales son voluntarias, sin que la falta de contestación implique una merma en la calidad o cantidad de los servicios correspondientes, a menos que se indique lo contrario.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Los Usuarios garantizan que los Datos Personales facilitados a JahugaPy son veraces y se hacen responsables de comunicar a ésta cualquier modificación en los mismos.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>La recolección y tratamiento de los Datos Personales tiene como finalidad el mantenimiento de la relación contractual, establecida si fuera el caso, con JahugaPy por la gestión, administración, prestación, ampliación y mejora del servicio de la plataforma de comunicación e intermediación entre los Usuarios.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Los datos que podrían recopilarse del usuario son el de nombre y apellido, número de teléfono o celular y correo electrónico.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Los datos se recopilan para proporcionar el servicio principal de la aplicación personalizadamente, mejorar la aplicación y mostrar pedidos de servicios relevantes para el usuario.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Recolectamos este tipo de información con el siguiente propósito:</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>- La aplicación utiliza los datos personales para identificar a los usuarios y proporcionarles un servicio personalizado.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>- La aplicación utiliza los datos sensibles como las contraseñas para proteger la seguridad de los usuarios.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>- La aplicación utiliza el número de teléfono del usuario para validarlo y enviar avisos personalizados.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Los datos se almacenan en servidores seguros. Los datos se utilizan sistemas de encriptación para proteger los datos sensibles. Para los datos sensibles como son la contraseña de los usuarios se utiliza un sistema de encriptación que imposibilita la lectura en texto plano de la contraseña, estos datos son transmitidos por una red asegurada por HTTPS al servidor donde se procesan los datos. Los usuarios tienen derecho a acceder, rectificar o eliminar sus datos personales. Los usuarios pueden optar por no recibir notificaciones ni anuncios a pedidos de servicio de ningún tipo.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>En JahugaPy estamos comprometidos a brindarle y a mejorar la plataforma de comunicación y a tal fin utilizaremos encuestas, solicitaremos opiniones de los Usuarios. No obstante, en cada caso el Usuario tendrá conocimiento con exactitud qué tipo de información será almacenada en nuestra base datos.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>JahugaPy no recopila, a sabiendas información sobre menores, ni realiza ventas a menores. Al usar los Servicios, usted declara que tiene al menos 18 años o que es el padre o tutor de dicho menor y da su consentimiento para el uso de los Servicios por parte de dicho menor dependiente. Si nos enteramos de que se ha recopilado información personal de usuarios menores de 18 años, desactivaremos la cuenta y tomaremos las medidas razonables para eliminar rápidamente dicha información de nuestros registros. Si tiene conocimiento de cualquier dato que podamos haber recopilado de niños menores de 18 años, contáctenos en info@jahugaparaguay.com.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>La principal razón por la que almacenamos información de identificación personal en nuestro sitio es que el Usuario tengan que dar la información de contacto sólo una vez.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Es posible que actualicemos este aviso de privacidad de vez en cuando. La versión actualizada se indicará mediante una actualización "Revisado" fecha y la versión actualizada entrará en vigencia tan pronto como sea accesible. Si realizamos cambios sustanciales a este aviso de privacidad, podemos notificarle ya sea publicando de manera destacada un aviso de dichos cambios o enviándole directamente una notificación. Le recomendamos que revise este aviso de privacidad con frecuencia para estar informado de cómo protegemos su información.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Siempre tratamos la información de identificación personal como información confidencial y la compartimos solo con aquellos empleados que necesiten la misma para brindar a usted un mejor servicio.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>Los datos se comparten con otros desarrolladores y proveedores de servicios para proporcionar la aplicación, mejorar el servicio ofrecido por la aplicación y mostrar pedidos de servicios relevantes. Nunca compartimos información de identificación personal recopilada en nuestro sitio web y aplicación con terceros.</Text>
                    <Text style={[commonStyles.text, { marginBottom: 5 }]}>JahugaPy solo podrá revelar los datos personales de los Usuarios en caso de ser notificados de una orden judicial o en cumplimiento de una inspección de las autoridades pertinentes.</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 10
    }
});

export default PrivacyPolicy;